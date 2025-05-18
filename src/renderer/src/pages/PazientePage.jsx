import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../data/PazienteContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PazienteCard } from '../components/PazienteCard'
import { DataTable } from '../components/DataTable'
//

const PazientePage = () => {
  const { id } = useParams() // Extracts the ID from URL

  const { paziente, fetchPaziente, resetPaziente } = useContext(PazienteContext)
  const [pazienteId, setPazienteId] = useState(id)

  useEffect(() => {
    //resetPaziente();
    console.log('calling fetchPaziente')
    fetchPaziente(pazienteId)
  }, [])

  return (
    <div>
      {paziente ? (
        <>
          <PazienteCard paziente={paziente} />

          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Anamnesi Remote</h3>
            <Link
              to={`/paziente/${paziente.ID}/anamnesi-remote/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>

          <div>
            <DataTable 
              data={paziente.anamnesiRemote} 
              idConfig={{entityUrlSegment:'/anamnesi-remota/:id/edit', iconCss:'fas fa-pencil-alt'}} />
          </div>

          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Consulti</h3>
            <Link
              to={`/paziente/${paziente.ID}/consulti/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>
          <div>
            <DataTable 
              data={paziente.consulti} 
              idConfig={{entityUrlSegment:'/consulto/:id', iconCss:'fa fa-notes-medical'}}  />
          </div>
        </>
      ) : (
        <p>No paziente found with id={pazienteId}</p>
      )}
    </div>
  )
}

export default PazientePage
