import { Link } from 'react-router-dom'
import { useState } from "react";
import { calculateAge, formatDateAsSettings } from '../utils/dateUtils'

export const PazienteCard = ({paziente}) => {
  const [showBio, setShowBio] = useState(false)

    return(
      <div className="max-w-sm min-w-[300px] mx-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow relative">
        <div className="flex items-center">
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">{paziente.nome} {paziente.cognome}</h2>
            <p className="text-gray-600 dark:text-gray-400">{calculateAge(paziente.data_nascita)} anni - {paziente.professione}</p>
            {showBio && (
              <div className="text-gray-500 dark:text-gray-300 mt-2">
                  <p>
                    <strong>Indirizzo:</strong> {paziente.indirizzo}
                  </p>
                  <p>
                    <strong>Città:</strong> {paziente.citta}
                  </p>
                  <p>
                    <strong>Telefono:</strong> {paziente.telefono}
                  </p>
                  <p>
                    <strong>Cellulare:</strong> {paziente.cellulare}
                  </p>
                  <p>
                    <strong>Provincia:</strong> {paziente.prov}
                  </p>
                  <p>
                    <strong>CAP:</strong> {paziente.cap}
                  </p>
                  <p>
                    <strong>Email:</strong> {paziente.email}
                  </p>
                  <p>
                    <strong>Data di nascita:</strong> {formatDateAsSettings(paziente.data_nascita)}
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
            to={`/paziente/${paziente.ID}`}
            className="text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-400 flex items-center gap-2"
          >
             <i className="fas fa-info-circle"></i> Details
          </Link>
          <Link
            to={`/paziente/${paziente.ID}/edit`}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400 text-xl"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>           
        </div>
      </div>  
    )

}