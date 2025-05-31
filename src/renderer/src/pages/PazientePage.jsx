import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../data/PazienteContext'
import { ConsultoContext } from '../data/ConsultoContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PazienteCard } from '../components/PazienteCard'
import { DataTable } from '../components/DataTable'
import { toast } from 'react-toastify'
import { DeleteModal } from '../components/DeleteModal'
//

const PazientePage = () => {
  const { id } = useParams() // Extracts the ID from URL

  const { paziente, fetchPaziente, getTipoAnamnesiRemote, tipoAnamnesi, deleteAnamnesiRemota } = useContext(PazienteContext)
  const { deleteConsulto} = useContext(ConsultoContext)
  const [pazienteId, setPazienteId] = useState(id)

  //Modal delete
  const [modalOpen, setModalOpen] = useState(false); //modal cancel button
  const [deletingEntity, setDeletingEntity] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState("");//modal input

  const handleDeleteClick = (entityType, entity, deleteEntity) => { // DataTable onDelete handler
    setDeletingEntity({entityType, entity,deleteEntity});
    setModalOpen(true);
    setConfirmationInput("");
  };

  const handleConfirmDelete = () => { // modal confirm button
    if (deletingEntity && confirmationInput.toLocaleLowerCase() === deletingEntity.entityType.toLocaleLowerCase()) {
      //setData(data.filter((item) => item.id !== deleteId));
      deletingEntity.deleteEntity(deletingEntity.entity)

      setModalOpen(false);
      setConfirmationInput("");
    }
  };  
  // Modal delete

  useEffect(() => {
    //resetPaziente();
    console.log('calling fetchPaziente:' + pazienteId)
    fetchPaziente(pazienteId)
    getTipoAnamnesiRemote()
  }, [])

  const onDeleteAnamnesiRemota = async (entity) => {
    deleteEntityTemplate('Anamnesi Remota', entity, deleteAnamnesiRemota)
  }

  const onDeleteConsulto = async (entity) => {
    deleteEntityTemplate('Consulto', entity, deleteConsulto)
  }

  const deleteEntityTemplate = async (entityName, entity, deleteEntity) => {
    try {
      await deleteEntity(entity)
      await fetchPaziente(entity.ID_paziente)
      toast.success(`${entityName} deleted successuflly`, {
        position: 'top-center'
      })
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })    
    }
  }    

  const convertLookupAnamnesi = (lkpId) => {
    const itm = tipoAnamnesi.find((e) => e.ID== lkpId)
    return itm !== undefined? itm.descrizione : '-'
  }

  return (
    <div>
      {paziente ? (
        <>
          <PazienteCard paziente={paziente} />

          <div className="flex items-center space-x-2">
            <h3 className="h3-primary">Anamnesi Remote</h3>
            <Link
              to={`/paziente/${paziente.ID}/anamnesi-remote/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>

          <div>
            <DataTable 
              entityType='Anamnesi Remota'
              data={paziente.anamnesiRemote} 
              idConfig={{entityUrlSegment:'/anamnesi-remota/:id/edit', iconCss:'fas fa-pencil-alt'}}
              onDeleting={handleDeleteClick}
              deleteHandler={onDeleteAnamnesiRemota}
              convertLookup={convertLookupAnamnesi} />
          </div>

          <div className="flex items-center space-x-2">
            <h3 className="h3-primary">Consulti</h3>
            <Link
              to={`/paziente/${paziente.ID}/consulti/create`}
              className="text-blue-600 hover:underline"
            >
              <i className="fa fa-plus"></i>
            </Link>
          </div>
          <div>
            <DataTable 
              entityType='Consulto'
              data={paziente.consulti} 
              idConfig={{entityUrlSegment:'/consulto/:id', iconCss:'fa fa-notes-medical'}}
              onDeleting={handleDeleteClick}
              deleteHandler={onDeleteConsulto} />
          </div>


{modalOpen && (
  <DeleteModal 
    confirmationInput={confirmationInput}
    setConfirmationInput={setConfirmationInput} 
    setModalOpen={setModalOpen} 
    handleConfirmDelete={handleConfirmDelete} />)}


        </>
      ) : (
        <p>No paziente found with id={pazienteId}</p>
      )}
    </div>
  )
}

export default PazientePage
