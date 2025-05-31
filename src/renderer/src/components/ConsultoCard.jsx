import { Link } from 'react-router-dom'
import { formatDateAsSettings } from '../utils'

export const ConsultoCard = ({consulto}) => {
    return (
        <div className="max-w-sm min-w-[300px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
        <div className="bg-blue-600 p-2 text-white text-center">
          <h2 className="text-xl font-semibold">
            Consulto del 
          </h2>
          <p className="opacity-80">{formatDateAsSettings(consulto.data)}</p>
        </div>

        <div className="flex items-center justify-between bg-gray-200 p-2">
          <label htmlFor="toggleDetailsC" className="font-semibold cursor-pointer">
            Mostra dettagli ▼
          </label>
          <Link
            to={`/consulto/${consulto.ID}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fa fa-notes-medical"></i>
          </Link>

          <Link
            to={`/consulto/${consulto.ID}/edit`}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </div>


        <input type="checkbox" id="toggleDetailsC" className="hidden peer" />
        <div className="p-2 space-y-2 text-gray-700 hidden peer-checked:block">
          <p>
            <strong>Data:</strong> <span>{formatDateAsSettings(consulto.data)}</span>
          </p>
          <p>
            <strong>Problema Iniziale:</strong> {consulto.problema_iniziale}
          </p>
        </div>
      </div>
    )

}