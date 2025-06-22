import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../contexts/PazienteContext'
import { ConsultoContext } from '../contexts/ConsultoContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PazienteCard } from '../components/PazienteCard'
import { DataTable } from '../components/DataTable'
import { toast } from 'react-toastify'
import { DeleteModal } from '../components/DeleteModal'
import { DataTableTile } from '../components/DataTableTitle'

const PazientePage = () => {
  const { id } = useParams() // Extracts the ID from URL

  const { paziente, fetchPaziente, getTipoAnamnesiRemote, tipoAnamnesi, deleteAnamnesiRemota } = useContext(PazienteContext)
  const { deleteConsulto} = useContext(ConsultoContext)
  const [pazienteId, setPazienteId] = useState(id)

  //Modal delete
  const [modalOpen, setModalOpen] = useState(false); //modal cancel button
  const [deletingEntity, setDeletingEntity] = useState(null);

  const handleDeleteClick = (entityType, entity, deleteEntity) => { // DataTable onDelete handler
    setDeletingEntity({entityType, entity,deleteEntity});
    setModalOpen(true);
  };

  const canDelete = (input) => {
    console.log(input)
    return (deletingEntity && input.toLocaleLowerCase() === deletingEntity.entityType.toLocaleLowerCase())
  }

  const handleConfirmDelete = () => { // modal confirm button
      deletingEntity.deleteEntity(deletingEntity.entity)
      setModalOpen(false);
  };  

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

          <DataTableTile title="Anamnesi Remote" createPageUri={`/paziente/${paziente.ID}/anamnesi-remota/create`} />
          <DataTable 
            entityType='Anamnesi Remota'
            data={paziente.anamnesiRemote} 
            idConfig={{entityUrlSegment:'/anamnesi-remota/:id/edit', iconCss:'fas fa-pencil-alt'}}
            onDeleting={handleDeleteClick}
            deleteHandler={onDeleteAnamnesiRemota}
            convertLookup={convertLookupAnamnesi} />

          <DataTableTile title="Consulti" createPageUri={`/paziente/${paziente.ID}/consulto/create`} />
          <DataTable 
            entityType='Consulto'
            data={paziente.consulti} 
            idConfig={{entityUrlSegment:'/consulto/:id', iconCss:'fa fa-notes-medical'}}
            onDeleting={handleDeleteClick}
            deleteHandler={onDeleteConsulto} />

{modalOpen && (
  <DeleteModal 
    setModalOpen={setModalOpen} 
    handleConfirmDelete={handleConfirmDelete}
    canDeleteHandler={canDelete} />)}
        </>
      ) : (
        <p>No paziente found with id={pazienteId}</p>
      )}
    </div>
  )
}

export default PazientePage
