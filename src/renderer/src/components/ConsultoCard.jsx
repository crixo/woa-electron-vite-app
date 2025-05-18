import { Link } from 'react-router-dom'

export const ConsultoCard = ({consulto}) => {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h2 className="text-xl font-semibold">
            Consulto del {consulto.data}
          </h2>
        </div>

        <div className="flex items-center justify-between bg-gray-200 p-4">
          <label htmlFor="toggleDetails" className="font-semibold cursor-pointer">
            Mostra dettagli ▼
          </label>
          <Link
            to={`/consulto/${consulto.ID}/edit`}
            className="text-blue-500 hover:text-blue-700"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>
        </div>

        <input type="checkbox" id="toggleDetails" className="hidden peer" />

        <div className="p-6 space-y-2 text-gray-700 hidden peer-checked:block">
          <p>
            <strong>Data:</strong> {consulto.data}
          </p>
          <p>
            <strong>Problema Iniziale:</strong> {consulto.problema_iniziale}
          </p>
        </div>
      </div>
    )

}