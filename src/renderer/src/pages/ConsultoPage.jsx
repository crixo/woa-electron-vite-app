import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../contexts/PazienteContext'
import { ConsultoContext } from '../contexts/ConsultoContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ConsultoCard } from '../components/ConsultoCard'
import { PazienteCard } from '../components/PazienteCard'
import { DataTable } from '../components/DataTable'
import { DeleteModal } from '../components/DeleteModal'
import { toast } from 'react-toastify'
import { DataTableTile } from '../components/DataTableTitle'
//

const ConsultoPage = () => {
  const { id } = useParams() // Extracts the ID from URL
  const { paziente, fetchPaziente, resetPaziente } = useContext(PazienteContext)
  const { consulto, fetchConsulto, getTipoEsami, tipoEsami, deleteAnamnesiProssima, deleteEsame, deleteTrattamento, deleteValutazione} = useContext(ConsultoContext)
  //const [pazienteId, setPazienteId] = useState(id)

  useEffect(() => {
    //resetPaziente();
    console.log('calling fetchPaziente from ConsultoPage:'+id)
    fetchConsulto(id)
    getTipoEsami()
  }, [])

  const convertLookupEsami = (lkpId) => {
    const itm = tipoEsami.find((e) => e.ID== lkpId)
    return itm!==undefined? itm.descrizione : '-'
  }

  //Modal delete
  const [modalOpen, setModalOpen] = useState(false); //modal cancel button
  const [deletingEntity, setDeletingEntity] = useState(null);
  //const [confirmationInput, setConfirmationInput] = useState("");//modal input

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

  const onDeleteAnamnesiProssima = async (entity) => {
    deleteEntityTemplate('Anamnesi Prossima', entity, deleteAnamnesiProssima)
  }

  const onDeleteEsame= async (entity) => {
    deleteEntityTemplate('Esame', entity, deleteEsame)
  }
  const onDeleteValutazione= async (entity) => {
    deleteEntityTemplate('Valutazione', entity, deleteValutazione)
  }
  const onDeleteTrattamento= async (entity) => {
    deleteEntityTemplate('Trattamento', entity, deleteTrattamento)
  }

  const deleteEntityTemplate = async (entityName, entity, deleteEntity) => {
    try {
      await deleteEntity(entity)
      await fetchConsulto(entity.ID_consulto)
      toast.success(`${entityName} deleted successuflly`, {
        position: 'top-center'
      })
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })    
    }
  }  

  return (
    <div>
      {consulto ? (
        <>
        <div className="flex space-x-4">
          <PazienteCard paziente={paziente} />

          <ConsultoCard consulto={consulto} />
        </div>

        <DataTableTile title="Anamnesi Prossime" 
          createPageUri={`/consulto/${consulto.ID}/anamnesi-prossime/create`} 
          showAdd={!consulto.anamnesiProssime || consulto.anamnesiProssime.length === 0} />
        <DataTable
          entityType='Anamnesi Prossima'
          data={consulto.anamnesiProssime}
          idConfig={{entityUrlSegment:'/anamnesi-prossima/:id/edit', iconCss:'fas fa-pencil-alt'}}
          onDeleting={handleDeleteClick}
          deleteHandler={onDeleteAnamnesiProssima} />

        <DataTableTile title="Esami" createPageUri={`/consulto/${consulto.ID}/esami/create`} />
        <DataTable 
          entityType='Esame'
          data={consulto.esami}
          idConfig={{entityUrlSegment:'/esame/:id/edit', iconCss:'fas fa-pencil-alt'}}
          convertLookup={convertLookupEsami}
          onDeleting={handleDeleteClick}
          deleteHandler={onDeleteEsame} />

        <DataTableTile title="Trattamenti" createPageUri={`/consulto/${consulto.ID}/trattamenti/create`} />
        <DataTable 
          entityType='Trattamento'
          data={consulto.trattamenti} 
          idConfig={{entityUrlSegment:'/trattamento/:id/edit', iconCss:'fas fa-pencil-alt'}}
          onDeleting={handleDeleteClick}
          deleteHandler={onDeleteTrattamento} />

         
        <DataTableTile title="Valutazioni" createPageUri={`/consulto/${consulto.ID}/valutazioni/create`} />
        <DataTable 
          entityType='Valutazione'
          data={consulto.valutazioni} 
          idConfig={{entityUrlSegment:'/valutazione/:id/edit', iconCss:'fas fa-pencil-alt'}}
          onDeleting={handleDeleteClick}
          deleteHandler={onDeleteValutazione} />

{modalOpen && (
  <DeleteModal 
    setModalOpen={setModalOpen} 
    handleConfirmDelete={handleConfirmDelete}
    canDeleteHandler={canDelete} />)}

        </>
      ) : (
        <p>No consulto found with id={id}</p>
      )}
    </div>
  )
}

export default ConsultoPage
