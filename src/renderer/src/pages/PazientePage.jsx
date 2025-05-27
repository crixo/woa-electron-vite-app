import { useContext, useEffect, useState } from 'react'
import { PazienteContext } from '../data/PazienteContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PazienteCard } from '../components/PazienteCard'
import { DataTable } from '../components/DataTable'
import { toast } from 'react-toastify'
//

const PazientePage = () => {
  const { id } = useParams() // Extracts the ID from URL

  const { paziente, fetchPaziente, getTipoAnamnesiRemote, tipoAnamnesi } = useContext(PazienteContext)
  const [pazienteId, setPazienteId] = useState(id)

  //Modal delete
  const [modalOpen, setModalOpen] = useState(false); //modal cancel button
  const [deletingEntity, setDeletingEntity] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState("");//modal input
  const DELETE_CONFIRM_TYPING = "delete-me"

  const handleDeleteClick = (entity, deleteEntity) => { // DataTable onDelete handler
    setDeletingEntity({entity,deleteEntity});
    setModalOpen(true);
    setConfirmationInput("");
  };

  const handleConfirmDelete = () => { // modal confirm button
    if (deletingEntity && confirmationInput === DELETE_CONFIRM_TYPING) {
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

  const deleteAnamnesiRemota = async (entity) => {
    try {
      await dal.deleteLeaf("anamnesi_remota", entity.ID)
      await fetchPaziente(pazienteId)
      toast.success(`Anamnesi remota deleted successuflly`, {
        position: 'top-center'
      })
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })    
    }
  }

  const deleteConsulto = async (entity) => {
    console.log(entity)
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
              data={paziente.anamnesiRemote} 
              idConfig={{entityUrlSegment:'/anamnesi-remota/:id/edit', iconCss:'fas fa-pencil-alt'}}
              onDeleting={handleDeleteClick}
              deleteHandler={deleteAnamnesiRemota}
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
              data={paziente.consulti} 
              idConfig={{entityUrlSegment:'/consulto/:id', iconCss:'fa fa-notes-medical'}}
              onDeleting={handleDeleteClick}
              deleteHandler={deleteConsulto} />
          </div>


{modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
      <p>Type the entity name to confirm deletion:</p>
      <input
        autoFocus
        type="text"
        value={confirmationInput}
        onChange={(e) => setConfirmationInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mt-2"
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setModalOpen(false)}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}


        </>
      ) : (
        <p>No paziente found with id={pazienteId}</p>
      )}
    </div>
  )
}

export default PazientePage
