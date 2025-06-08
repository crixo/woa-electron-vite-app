import { useState } from "react"
import MarkdownToHtmlRenderer from "../components/MarkdownToHtmlRenderer";
import { marked } from "marked";

function StatisticsPage() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")

  const handleSend = async () => {
    let result
    try{
      result = `
  Nelle tue statistiche, si rileva che le seguenti persone abbiano consultato il nostro centro sanitario:

- Renata Mazzoni ha avuto 7 visite.
- Alessandro Sibille e Victoria Sibille hanno entrambe avuto 7 visite ciascuna.
- Angela Glionna ha avuto 6 visite.
- Marco Fonti ha avuto 6 visite.

In totale, il nostro centro sanitario ha assistito 27 persone.      
      `//await dal.answerWithAI(inputText); // Call the function and wait for the result
    }catch (error){
      result = error.message
    }
    setOutputText(result); // Update the displayed text
  };

  return (
    <div className="w-full flex flex-col items-center">

      {/* Input Field */}
      <input
        type="text"
        placeholder="Cosa vuoi sapere sui tuoi pazienti?"
        className="w-[95vw] p-2 border border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md mt-4"
        onChange={(e) => setInputText(e.target.value)}
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Rispondimi!
      </button>

      {/* Output Text Container */}
      <div className="mt-4 p-4 border rounded border-gray-600 w-[95vw] bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
        {outputText ? (
          <MarkdownToHtmlRenderer markdown={outputText} />
        ) : (
          <p className="text-gray-400">La risposta sara' qui...</p>
        )}
      </div>
    </div>
  );
}

export default StatisticsPage;
