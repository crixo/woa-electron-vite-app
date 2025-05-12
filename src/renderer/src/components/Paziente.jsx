const Paziente = ({paziente}) => {
  return(
      <div className="bg-white rounded shadow-lg overflow-hidden">
          <div className="px-4 pt-2 pb-4">
              <h2 className="text font-semibold">{paziente.nome}</h2>
              <div className="text-sm">Cognome : {paziente.cognome}</div>
          </div>
  </div>
  )
}

export default Paziente;