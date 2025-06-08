import { Link } from 'react-router-dom'

const Paziente = ({ paziente }) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <Link 
        className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        to={`/paziente/${paziente.ID}`}>{paziente.cognome}, {paziente.nome}
      </Link>
    </div> 
  )
}

export default Paziente
