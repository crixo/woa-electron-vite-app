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
<>
    <div className="flex gap-6 max-w-4xl mx-auto mt-4">
      <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <label for="input" className="form-label">
          Cognome del paziente da cercare
        </label>
        <input
          type="text"
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="form-field"
          placeholder="Inserisci paziente da cercare"
        />
        <div class="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => getPazienti(1)}
            className="button-search">
            Search
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <Link to="/paziente/create" className="button-crud">Crea un nuovo paziente </Link>
        <button onClick={() => getPazientiWithManyConsulti()} className="button-search">
          Pazienti con piu' consulti
        </button>
        <button onClick={() => getPazientiLastConsulti()} className="button-search">
          Pazienti visitati di recente
        </button>    
        <Link to="/chat" className="button-link">AI Statistiche</Link>
      </div>
    </div>

    {pazienti.length > 0  ? (
      <div className='w-full max-w-6xl mx-auto p-6 dark:bg-gray-900 bg-white rounded-lg shadow-md mt-4'>
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
</>
  )
}

export default HomePage
