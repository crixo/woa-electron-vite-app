  
  export const DeleteModal = ({confirmationInput, setConfirmationInput, setModalOpen, handleConfirmDelete}) => {
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Conferma la cancellazione</h2>
        <p>Digita il tipo di entita' per finalizzare la cancellazione:</p>
        <input
            autoFocus
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            className="border rounded px-2 py-1 w-full mt-2"
        />
        <div className="flex justify-end mt-4">
            <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mr-2"
            >
            Cancel
            </button>
            <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
            Confirm
            </button>
        </div>
        </div>
    </div>
    )
  }