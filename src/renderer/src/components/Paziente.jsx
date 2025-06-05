import { Link } from 'react-router-dom'

const Paziente = ({ paziente }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 pt-2 pb-4">
        <div className="text-sm text-black dark:text-white">
          <Link 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400"
            to={`/paziente/${paziente.ID}`}>{paziente.cognome}, {paziente.nome}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Paziente
