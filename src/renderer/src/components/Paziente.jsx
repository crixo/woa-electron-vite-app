import { Link } from 'react-router-dom'

const Paziente = ({ paziente }) => {
  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <div className="px-4 pt-2 pb-4">
        <div className="text-sm">
          <Link to={`/paziente/${paziente.ID}`}>{paziente.cognome}, {paziente.nome}</Link>
        </div>
      </div>
    </div>
  )
}

export default Paziente
