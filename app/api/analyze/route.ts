import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

/*
====================================================
UTILITIES
====================================================
*/

function normalizeUrl(url: string) {
  if (!url) return ""

  let normalized = url.trim()

  if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
    normalized = "https://" + normalized
  }

  return normalized
}

async function fetchWebsite(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "AI Marketing Clarity Diagnostic"
      }
    })

    return await res.text()

  } catch (error) {
    console.error("Fetch failed:", url)
    return ""
  }
}

function safeJsonParse(text: string): any {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

function clampScore(n: unknown, fallback = 0) {
  const value = typeof n === "number" ? n : Number(n)
  if (!Number.isFinite(value)) return fallback
  return Math.max(0, Math.min(100, Math.round(value)))
}

function asString(v: unknown, fallback = "") {
  return typeof v === "string" ? v : fallback
}

function asStringArray(v: unknown, fallback: string[] = []) {
  if (!Array.isArray(v)) return fallback
  return v.filter((x) => typeof x === "string").map((s) => s.trim()).filter(Boolean)
}

/*
====================================================
EXTRACT WEBSITE MARKETING SIGNALS
====================================================
*/

function extractMarketingSignals(html: string) {

  const clean = html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\n/g, " ")

  const getFirstMatch = (regex: RegExp) => {
    const match = clean.match(regex)
    return match ? match[1].trim() : ""
  }

  const heroHeadline = getFirstMatch(/<h1[^>]*>(.*?)<\/h1>/i)
  const valueProposition = getFirstMatch(/<h2[^>]*>(.*?)<\/h2>/i)

  const ctas =
    clean.match(/>(Get|Start|Sell|Contact|Offer|Buy)[^<]{0,60}</gi)?.slice(0, 5) || []

  const trustSignals =
    clean.match(/(reviews|testimonials|trusted|years|clients|families|since)/gi)?.slice(0, 10) || []

  const offer =
    clean.match(/(cash offer|no commission|fast closing|no repairs|free consultation)/gi)?.slice(0, 10) || []

  return {
    heroHeadline,
    valueProposition,
    ctas,
    trustSignals,
    offer
  }
}

/*
====================================================
MAIN API
====================================================
*/

export async function POST(req: NextRequest) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  try {

    const body = await req.json()

    const website = normalizeUrl(body.website)

    const competitors = (Array.isArray(body.competitors) ? body.competitors : [
      body.competitor1,
      body.competitor2
    ])
      .filter(Boolean)
      .map((c: string) => normalizeUrl(c))

    /*
    =========================
    CAPTURE LEAD DATA
    =========================
    */

    const linkedin = body.linkedin || ""
    const email = body.email || ""
    const position = body.position || ""
    const language = body.language || "en"

    try {

      await fetch(process.env.GOOGLE_SHEET_WEBHOOK as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          website,
          linkedin,
          email,
          position,
          language
        })
      })
    
    } catch (err) {
      console.error("Google Sheet lead save failed", err)
    }

    console.log("NEW LEAD:", {
      website,
      linkedin,
      email,
      position,
      language,
      time: new Date().toISOString()
    })

    if (!website) {
      return NextResponse.json(
        { error: "Website required" },
        { status: 400 }
      )
    }

    /*
    =========================
    FETCH MAIN WEBSITE
    =========================
    */

    const mainHTML = await fetchWebsite(website)
    const signals = extractMarketingSignals(mainHTML)

    /*
    =========================
    FETCH COMPETITORS
    =========================
    */

    const competitorHTML = await Promise.all(
      competitors.map((url: string) => fetchWebsite(url))
    )

    const competitorSignals = competitorHTML.map((html) =>
      extractMarketingSignals(html)
    )

    /*
    ==========================================================
    IMPROVED STRATEGIC PROMPT
    ==========================================================
    */

    const prompt = `
You are a senior marketing strategist performing a practical marketing audit.

Write the entire report in ${language === "ru" ? "Russian" :
      language === "es" ? "Spanish" :
      language === "hy" ? "Armenian" : "English"}.

Your job is to identify **specific marketing problems and actionable improvements**.

Every insight must follow this structure:

Problem → Why it matters → Actionable Fix.

WEBSITE SIGNALS

Hero Headline:
${signals.heroHeadline}

Value Proposition:
${signals.valueProposition}

Primary CTAs:
${signals.ctas}

Trust Signals:
${signals.trustSignals}

Offer:
${signals.offer}

COMPETITOR SIGNALS

${JSON.stringify(competitorSignals)}

Return ONLY valid JSON.

Output schema:

{
  "score": number,
  "scores": {
    "positioning": number,
    "messaging": number,
    "icp": number,
    "funnel": number
  },
  "sections": [],
  "competitive_gaps": [],
  "strategic_insight": "",
  "recommendations": []
}
`

    /*
    ==========================================================
    OPENAI REQUEST
    ==========================================================
    */

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are an elite marketing strategy consultant."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })

    const text = completion.choices[0].message.content || ""

    const raw = safeJsonParse(text)

    if (!raw) {
      return NextResponse.json(
        {
          score: 60,
          scores: { positioning: 60, messaging: 60, icp: 60, funnel: 60 },
          sections: [],
          competitive_gaps: [],
          strategic_insight: "",
          recommendations: []
        },
        { status: 200 }
      )
    }

    const scores = raw.scores ?? {}

    const shaped = {
      score: clampScore(raw.score, 60),

      scores: {
        positioning: clampScore(scores.positioning, 60),
        messaging: clampScore(scores.messaging, 60),
        icp: clampScore(scores.icp, 60),
        funnel: clampScore(scores.funnel, 60)
      },

      sections: raw.sections ?? [],
      competitive_gaps: asStringArray(raw.competitive_gaps, []),
      strategic_insight: asString(raw.strategic_insight, ""),
      recommendations: asStringArray(raw.recommendations, [])
    }

    return NextResponse.json(shaped)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    )
  }
}