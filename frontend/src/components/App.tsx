import { useState } from "react";

const API_URL = "https://agent-app-uqy3.onrender.com";
// const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAgent = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/agent/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response || data.error || "No response");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Ask the Agent</h1>
        <textarea
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Type your question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={askAgent}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
        {response && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg whitespace-pre-wrap">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}
