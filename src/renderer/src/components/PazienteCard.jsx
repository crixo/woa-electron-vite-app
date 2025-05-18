import { Link } from 'react-router-dom'

export const PazienteCard = ({paziente}) => {

    return(
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="bg-blue-600 p-6 text-white text-center">
              <h2 className="text-xl font-semibold">
                {paziente.nome} {paziente.cognome}
              </h2>
              <p className="opacity-80">{paziente.professione}</p>
            </div>

            <div className="flex items-center justify-between bg-gray-200 p-4">
              <label htmlFor="toggleDetails" className="font-semibold cursor-pointer">
                Mostra dettagli ▼
              </label>
              <Link
                to={`/paziente/${paziente.ID}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <i className="fas fa-user-alt"></i>
              </Link>
            </div>

            <input type="checkbox" id="toggleDetails" className="hidden peer" />

            <div className="p-6 space-y-2 text-gray-700 hidden peer-checked:block">
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
                <strong>Data di nascita:</strong> {paziente.data_nascita}
              </p>
            </div>
          </div>        
    )

}