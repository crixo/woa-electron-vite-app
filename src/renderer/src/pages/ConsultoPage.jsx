import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../data/PazienteContext'
import { ConsultoContext } from '../data/ConsultoContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { DataTable } from '../components/DataTable'
//

const ConsultoPage = () => {
  const { id } = useParams() // Extracts the ID from URL
  const { paziente, fetchPaziente, resetPaziente } = useContext(PazienteContext)
  const { consulto, fetchConsulto} = useContext(ConsultoContext)
  //const [pazienteId, setPazienteId] = useState(id)

  useEffect(() => {
    //resetPaziente();
    console.log('calling fetchPaziente from ConsultoPage:'+id)
    fetchConsulto(id)
  }, [])

  return (
    <div>
      {consulto ? (
        <>
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

          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Anamnesi Prossime</h3>
            <Link
              to={`/consulto/${consulto.ID}/anamnesi-prossime/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>

          <div>
            <DataTable
              data={consulto.anamnesiProssime}
              idConfig={{entityUrlSegment:'/anamnesi-prossima/:id/edit', iconCss:'fas fa-pencil-alt'}}  />
          </div>

          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Esami</h3>
            <Link
              to={`/consulto/${consulto.ID}/esami/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>
          <div>
            <DataTable 
              data={consulto.esami}
              idConfig={{entityUrlSegment:'/esame/:id/edit', iconCss:'fas fa-pencil-alt'}}  />
          </div>

          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Trattamenti</h3>
            <Link
              to={`/consulto/${consulto.ID}/trattamenti/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>
          <div>
            <DataTable 
              data={paziente.anamnesiRemote} 
              idConfig={{entityUrlSegment:'/trattamento/:id/edit', iconCss:'fas fa-pencil-alt'}} />
          </div>
         
        </>
      ) : (
        <p>No consulto found with id={id}</p>
      )}
    </div>
  )
}

export default ConsultoPage
