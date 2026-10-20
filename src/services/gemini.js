const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateStudentInsights = async (metrics) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is missing.");
  }

  const prompt = `
Analyze these student-record statistics:
Total students: ${metrics.totalStudents}
Missing mobile numbers: ${metrics.missingMobile}
Missing addresses: ${metrics.missingAddress}

Return exactly 3 short numbered insights.
Each insight must be actionable and based only on these numbers.

Do not repeat the same observation.
If all records are complete, suggest practical next steps
for maintaining data quality and improving administration.
If there are no students, recommend adding the first record.

Keep the complete answer under 80 words.
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 180,
        },
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to generate AI insights.");
  }

  const insights = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!insights) {
    throw new Error("Gemini returned no insights. Please try again.");
  }

  return insights;
};
