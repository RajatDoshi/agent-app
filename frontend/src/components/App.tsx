import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAgent() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("http://127.0.0.1:8000/agent/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response ?? data.error ?? "No response");
    } catch (err) {
      setResponse("Error connecting to backend");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          AI Agent Q&A
        </h1>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={4}
          placeholder="Ask your question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          onClick={askAgent}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
        {response && (
          <div className="p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
