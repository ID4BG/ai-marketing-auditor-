export async function runDiagnostic(data: {
    website: string;
    competitors: string[];
  }) {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to run diagnostic");
    }
  
    return response.json();
  }