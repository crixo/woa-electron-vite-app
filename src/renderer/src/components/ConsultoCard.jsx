import { Link } from 'react-router-dom'
import { useState } from "react";
import { formatDateAsSettings } from '../utils/dateUtils'

export const ConsultoCard = ({consulto}) => {
  const [showBio, setShowBio] = useState(false)
  return (
    <div className="max-w-sm min-w-[300px] mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative">
      <div className="flex items-center">
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">Consulto del</h2>
          <p className="text-gray-600 dark:text-gray-400">{formatDateAsSettings(consulto.data)}</p>
          {showBio && (
            <div className="text-gray-500 dark:text-gray-300 mt-2">
              <p>
                <strong>Data:</strong> <span>{formatDateAsSettings(consulto.data)}</span>
              </p>
              <p>
                <strong>Problema Iniziale:</strong> {consulto.problema_iniziale}
              </p>
              </div>              
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setShowBio(!showBio)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 flex items-center gap-2"
        >
          <i className={`fas ${showBio ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
          <span>{showBio ? "Hide" : "Show More"}</span>
        </button>
        <Link
          to={`/consulto/${consulto.ID}`}
          className="text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-400 flex items-center gap-2"
        >
            <i className="fas fa-info-circle"></i> Details
        </Link>
        <Link
          to={`/consulto/${consulto.ID}/edit`}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400 text-xl"
        >
          <i className="fas fa-pencil-alt"></i>
        </Link>           
      </div>      

    </div>
  )

}