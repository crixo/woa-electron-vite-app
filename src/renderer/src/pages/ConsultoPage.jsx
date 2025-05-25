import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../data/PazienteContext'
import { ConsultoContext } from '../data/ConsultoContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ConsultoCard } from '../components/ConsultoCard'
import { PazienteCard } from '../components/PazienteCard'
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

  const convertLookupEsami = (lkpId) => {
    const itm = null//tipoEsami.find((e) => e.ID== lkpId)
    return itm!==null? itm.descrizione : '-'
  }

  return (
    <div>
      {consulto ? (
        <>
        <div className="flex space-x-4">
          <PazienteCard paziente={paziente} />

          <ConsultoCard consulto={consulto} />
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
              idConfig={{entityUrlSegment:'/esame/:id/edit', iconCss:'fas fa-pencil-alt'}}
              convertLookup={convertLookupEsami}  />
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
              data={consulto.trattamenti} 
              idConfig={{entityUrlSegment:'/trattamento/:id/edit', iconCss:'fas fa-pencil-alt'}} />
          </div>
         
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Valutazioni</h3>
            <Link
              to={`/consulto/${consulto.ID}/valutazioni/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>
          <div>
            <DataTable 
              data={consulto.valutazioni} 
              idConfig={{entityUrlSegment:'/valutazione/:id/edit', iconCss:'fas fa-pencil-alt'}} />
          </div>
        </>
      ) : (
        <p>No consulto found with id={id}</p>
      )}
    </div>
  )
}

export default ConsultoPage
