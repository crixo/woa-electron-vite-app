import { Link } from 'react-router-dom'
import { formatDate } from '../utils'

export const ConsultoCard = ({consulto}) => {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
        <div className="bg-blue-600 p-2 text-white text-center">
          <h2 className="text-xl font-semibold">
            Consulto del {formatDate(consulto.data)}
          </h2>
          <p className="opacity-80">here</p>
        </div>

        <div className="flex items-center justify-between bg-gray-200 p-2">
          <label htmlFor="toggleDetailsC" className="font-semibold cursor-pointer">
            Mostra dettagli ▼
          </label>
          <Link
            to={`/consulto/${consulto.ID}/edit`}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </div>


        <input type="checkbox" id="toggleDetailsC" className="hidden peer" />
        <div className="p-6 space-y-2 text-gray-700 hidden peer-checked:block">
          <p>
            <strong>Data:</strong> <span>{consulto.data}</span>
          </p>
          <p>
            <strong>Problema Iniziale:</strong> {consulto.problema_iniziale}
          </p>
        </div>
      </div>
    )

}