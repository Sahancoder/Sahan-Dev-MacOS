export const useGemini = () => {
  const callGeminiAPI = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    
    console.log('API Key check:', apiKey ? 'API key found' : 'API key missing');
    
    if (!apiKey) {
      return "Error: API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.";
    }

    // Use stable model instead of experimental
    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ 
        parts: [{ text: prompt }] 
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API Error:', errorData);
        
        if (response.status === 403) {
          return "Error: API key is invalid or doesn't have access. Please check your API key.";
        } else if (response.status === 429) {
          return "Error: Rate limit exceeded. Please try again in a moment.";
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        return "I apologize, but I couldn't generate a response. Please try rephrasing your question.";
      }

      return data.candidates[0]?.content?.parts?.[0]?.text || "No response generated.";
      
    } catch (error) {
      console.error('Gemini API Connection Error:', error);
      return "Error: Could not connect to Gemini API. Please check your internet connection and try again.";
    }
  };

  return { callGeminiAPI };
};

