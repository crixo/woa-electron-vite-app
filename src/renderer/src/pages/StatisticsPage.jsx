import { useState } from "react";

function StatisticsPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleSend = async () => {
    const result = await dal.answerWithAI(inputText); // Call the function and wait for the result
    setOutputText(result); // Update the displayed text
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <input
        type="text"
        placeholder="Type something..."
        className="w-64 p-2 text-black rounded bg-gray-200"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Send Data
      </button>
      <div className="mt-4 p-4 border rounded border-gray-600 w-64">
        {outputText ? <p>{outputText}</p> : <p className="text-gray-400">Your text will appear here...</p>}
      </div>
    </div>
  );
}

export default StatisticsPage;
