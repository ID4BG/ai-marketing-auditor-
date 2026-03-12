import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

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

    const html = await res.text()

    return html

  } catch (error) {
    console.error("Fetch failed:", url)
    return ""
  }
}

function safeJsonParse(text: string): unknown {
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

  try {

    const body = await req.json()

    const website = normalizeUrl(body.website)

    const competitors = (Array.isArray(body.competitors) ? body.competitors : [
      body.competitor1,
      body.competitor2,
      body.competitor3
    ])
      .filter(Boolean)
      .map((c: string) => normalizeUrl(c))

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
    SUPER STRATEGIC PROMPT
    ==========================================================
    */

    const prompt = `
You are a world-class marketing strategist performing a professional strategic diagnostic.

Your task is to produce a deep and detailed marketing audit as STRUCTURED JSON so a UI can render it.

Write as if you are a senior marketing strategist speaking directly to a startup founder.
The tone must be direct, specific, and practical – no generic "AI" language, no buzzwords,
no vague phrases like "leverage synergies" or "drive engagement". Every sentence should
point to a concrete observation, implication, or recommended action.

Do not summarize the website. Evaluate the strategic effectiveness of the messaging and positioning.

Analyze the following extracted marketing signals.

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

Perform the AI Marketing Clarity Diagnostic.

Evaluate:

1. Positioning clarity
2. Messaging clarity
3. ICP definition
4. Conversion funnel friction
5. Competitive positioning

Also detect:

• messaging architecture
• proof strength
• differentiation
• trust signals
• conversion friction

Return ONLY valid JSON (no markdown, no code fences, no commentary).

Output schema (exact keys):

{
  "score": number, // 0-100 overall
  "scores": {
    "positioning": number, // 0-100
    "messaging": number,   // 0-100
    "icp": number,         // 0-100
    "funnel": number       // 0-100
  },
  "positioning_analysis": string, // detailed, analytical, minimum 200 words
  "messaging_analysis": string,   // detailed, analytical, minimum 200 words
  "competitive_gaps": string[],   // 3-7 bullets, concrete issues
  "strategic_insight": string,    // 2-6 sentences, punchy
  "recommendations": string[]     // 3-7 bullets, specific next steps
}

Constraints:
- All scores must be integers 0-100.
- "positioning_analysis" and "messaging_analysis" must each be at least 200 words, with
  concrete, founder-facing critique and recommendations (no fluff).
- Avoid generic phrases such as "overall", "in summary", "as an AI", "this section will", etc.
  Speak plainly and precisely, as a human strategist who has reviewed the site.
- Analyses must be high-signal and reference the extracted signals when possible.
- Arrays must be arrays of strings (no objects).
`

    /*
    ==========================================================
    OPENAI REQUEST
    ==========================================================
    */

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are an elite marketing strategy consultant producing deep marketing diagnostics."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })

    let text = completion.choices[0].message.content || ""

    const raw = safeJsonParse(text) as any

    if (!raw || typeof raw !== "object") {
      console.error("JSON parse failed:", text)
      return NextResponse.json(
        {
          score: 60,
          scores: { positioning: 60, messaging: 60, icp: 60, funnel: 60 },
          positioning_analysis: "",
          messaging_analysis: "",
          competitive_gaps: [],
          strategic_insight: "Most companies lose deals because their positioning is unclear.",
          recommendations: []
        },
        { status: 200 }
      )
    }

    const scores = raw.scores ?? raw.breakdown ?? {}

    const shaped = {
      score: clampScore(raw.score ?? raw.clarityScore, 60),
      scores: {
        positioning: clampScore(scores.positioning, 60),
        messaging: clampScore(scores.messaging, 60),
        icp: clampScore(scores.icp, 60),
        funnel: clampScore(scores.funnel, 60)
      },
      positioning_analysis: asString(raw.positioning_analysis ?? raw.positioningAnalysis, ""),
      messaging_analysis: asString(raw.messaging_analysis ?? raw.messagingAnalysis, ""),
      competitive_gaps: asStringArray(raw.competitive_gaps ?? raw.competitiveGaps, []),
      strategic_insight: asString(raw.strategic_insight ?? raw.strategicInsight, ""),
      recommendations: asStringArray(raw.recommendations ?? raw.strategicRecommendations, [])
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