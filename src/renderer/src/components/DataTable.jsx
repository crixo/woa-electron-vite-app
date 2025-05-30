import { Link } from 'react-router-dom'
import { useState } from "react";
import { formatDate, formatDateAsSettings } from '../utils';

export const DataTable = ({ idConfig, data, onDeleting, deleteHandler, convertLookup }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>
  }


  // const [modalOpen, setModalOpen] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);
  // const [confirmationInput, setConfirmationInput] = useState("");
  // const DELETE_CONFIRM_TYPING = "delete-me"

  // const handleDeleteClick = (id) => {
  //   setDeleteId(id);
  //   setModalOpen(true);
  //   setConfirmationInput("");
  // };

  // const handleConfirmDelete = () => {
  //   const entityToDelete = data.find((item) => item.id === deleteId);
  //   if (entityToDelete && confirmationInput === DELETE_CONFIRM_TYPING) {
  //     //setData(data.filter((item) => item.id !== deleteId));
  //     deleteHandler(entityToDelete)
  //     setModalOpen(false);
  //     setConfirmationInput("");
  //   }
  // };  

  const dataNoFK = data.map(obj => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !key.startsWith("ID_"))
    );
  });

  const headers = Object.keys(dataNoFK[0])

  const renderRow = (header, item) => {
    switch (header) {
      case "ID":
        return <Link
                  to={`${idConfig.entityUrlSegment.replace(':id', item[header])}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className={idConfig.iconCss}></i>
                </Link>;
      case "data":
        return formatDateAsSettings(item[header]);
      case "tipo":
        return convertLookup(item[header])
      default:
        return item[header];
    }
  };


  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-6 py-3" key={header}>
                {header}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataNoFK.map((item, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              key={index}
            >
              {headers.map((header) => (
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  key={header}
                >
                  { renderRow(header,item) }
                </td>
              ))}
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a
                    onClick={() => onDeleting(item,deleteHandler)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>




    </div>
  )
}

//export default DataTable

      // {modalOpen && (
      //   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      //     <div className="bg-white p-6 rounded shadow-md">
      //       <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
      //       <p>Scrivi <b>{DELETE_CONFIRM_TYPING}</b> per confermare la cancellazione irreversibile</p>
      //       <input
      //         type="text"
      //         value={confirmationInput}
      //         onChange={(e) => setConfirmationInput(e.target.value)}
      //         className="border rounded px-2 py-1 w-full mt-2"
      //       />
      //       <div className="flex justify-end mt-4">
      //         <button
      //           onClick={() => setModalOpen(false)}
      //           className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mr-2"
      //         >
      //           Cancel
      //         </button>
      //         <button
      //           onClick={handleConfirmDelete}
      //           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
      //         >
      //           Confirm
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // )}
