import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Paziente from '../components/Paziente'
//import { VITE_BACKEND_URL } from "../App";


const HomePage = () => {
  const [searchCriteria, setSearchCriteria] = useState('')
  const [pazienti, setPazienti] = useState([])
  const [currentPage, setCurrentPage] = useState();
  const [hasMore, setHasMore] = useState(true); // Assume more data available
  const [searchNumber, setSearchNumber] = useState(0)

  const getPazienti = async (pageNumber = 1) => {
    try {
      setSearchNumber(searchNumber+1)
      const pageSize = 20
      let rawResponse = await dal.getPazienti(searchCriteria, pageSize+1, pageNumber-1)
      const pazientiFromDb = JSON.parse(rawResponse)
      const hasMorePazienti = pazientiFromDb.length > pageSize
      setHasMore(hasMorePazienti); // Backend should return `hasMore`
      setCurrentPage(pageNumber);
      setPazienti(hasMorePazienti? pazientiFromDb.slice(0, -1) : pazientiFromDb)
    } catch (error) {
      console.log(error)
    }
  }

  const getPazientiWithManyConsulti = async () => {
    try {
      let rawResponse = await dal.getPazientiWithManyConsulti(20)
      const pazientiFromDb = JSON.parse(rawResponse)
      setPazienti(pazientiFromDb)
      setHasMore(false); // Backend should return `hasMore`
      setCurrentPage(1);
    } catch (error) {
      console.log(error)
    }
  }  

  const getPazientiLastConsulti = async () => {
    try {
      let rawResponse = await dal.getPazientiLastConsulti(20)
      const pazientiFromDb = JSON.parse(rawResponse)
      setPazienti(pazientiFromDb)
      setHasMore(false); // Backend should return `hasMore`
      setCurrentPage(1);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex justify-end">
        <Link
          to="/paziente/create"
          className="button-crud">
          Crea un nuovo paziente
        </Link>
      </div>

      <div className="flex">
        <div className="flex-grow space-y-2 mr-6">
          <div className="flex w-full max-w-sm mx-auto gap-4">
            <button onClick={() => getPazientiWithManyConsulti()} className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-400 whitespace-nowrap">
              Pazienti con piu' consulti
            </button>
            <button onClick={() => getPazientiLastConsulti()} className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-400 whitespace-nowrap">
              Pazienti visitati di recente
            </button>           
          </div>

          <div>
            <label className='form-label'>Cognome del paziente da cercare</label>
            <input
              type="text"
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="form-field"
              placeholder="Enter paziente da cercare"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => getPazienti(1)}
              className="button-crud"
            >
              Cerca Paziente
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3 ml-auto mt-6">

          <Link to="/chat" className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-400 text-center">AI Statistiche</Link>
        </div>
      </div>

      {pazienti.length > 0  ? (
        <div className='w-full max-w-6xl mx-auto p-6 dark:bg-gray-900 bg-white rounded-lg shadow-md'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pazienti.map((p) => (
            <Paziente paziente={p} />
          ))}
        </div>
        <div>
          <div className="flex justify-center items-center space-x-6 mt-6">
            <button 
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              onClick={() => getPazienti(currentPage - 1)} 
              disabled={currentPage === 1}>
              <i class="fas fa-chevron-left"></i> Prev
            </button>
            <span className="px-4 py-2 rounded-full bg-blue-500 dark:bg-blue-400 text-white dark:text-gray-900 font-bold shadow-md">Pagina {currentPage}</span>
            <button 
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              onClick={() => getPazienti(currentPage + 1)} 
              disabled={!hasMore}>
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        </div>
      ) : ( searchNumber>0  && <p>no pazienti found</p>)}
    </div>
  )
}

export default HomePage
