import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Paziente from '../components/Paziente'
//import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {
  const [searchCriteria, setSearchCriteria] = useState('')
  //const [showPazienti, setShowPazienti] = useState(false)
  const [pazienti, setPazienti] = useState([])
  //const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState();
  const [hasMore, setHasMore] = useState(true); // Assume more data available
  const [searchNumber, setSearchNumber] = useState(0)
  const [version, setVersion] = useState("");


  const getPazienti = async (pageNumber = 1) => {
    //e.preventDefault()

    try {
      //start loading
      //setIsLoading(true)
      setSearchNumber(searchNumber+1)

      const pageSize = 20
      let rawResponse = await dal.getPazienti(searchCriteria, pageSize+1, pageNumber-1)
      const pazientiFromDb = JSON.parse(rawResponse)
      const hasMorePazienti = pazientiFromDb.length > pageSize
      setHasMore(hasMorePazienti); // Backend should return `hasMore`
      setCurrentPage(pageNumber);
      setPazienti(hasMorePazienti? pazientiFromDb.slice(0, -1) : pazientiFromDb)
      //loading is finish
      //setIsLoading(false)
      //setShowPazienti(true)
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

//   useEffect(() => {
//     console.log("Updated pazienti:", pazienti.length);
// }, [pazienti]); // Runs every time users change

  useEffect(() => {
      settings.getVersion().then(setVersion);
  }, []);


  return (
    //if loading=yes, then display "loading"
    <div>
      <div className="flex justify-end">
        <Link
          to="/create"
          className="button-crud">
          Crea un nuovo paziente
        </Link>
      </div>


      <div className="flex">
        {/* Search Box (Expands to fill remaining space) */}
        <div className="flex-grow space-y-2 mr-6">
          <label className='form-label'>Cognome del paziente da cercare</label>
          <input
            type="text"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="form-field"
            placeholder="Enter paziente da cercare"
          />
          <div className="flex justify-center">
            <button
              onClick={() => getPazienti(1)}
              className="button-crud"
            >
              Cerca Paziente
            </button>
          </div>
        </div>

        {/* Stack of Buttons (Aligned to the far right, with space above) */}
        <div className="flex flex-col space-y-3 ml-auto mt-6">
          <button onClick={() => getPazientiWithManyConsulti()} className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-400">
            Pazienti con piu' consulti
          </button>
          <button onClick={() => getPazientiLastConsulti()} className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-400">
            Pazienti visitati di recente
          </button>
          <button className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-400">
            Azione 3
          </button>
        </div>
      </div>



      {pazienti.length > 0  ? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {pazienti.map((p, index) => (
            <div key={index} className="card">
              <Paziente key={index} paziente={p} />
            </div>
          ))}
          <div className="col-span-2 lg:col-span-4 flex justify-center items-center space-x-4 mt-4">
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
              onClick={() => getPazienti(currentPage - 1)} 
              disabled={currentPage === 1}>
              Previous
            </button>
            <span className="px-4 py-2 rounded-lg bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-white shadow">Page {currentPage}</span>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
              onClick={() => getPazienti(currentPage + 1)} 
              disabled={!hasMore}>
              Next
            </button>
          </div>
        </div>
      ) : ( searchNumber>0  && <p>no pazienti found</p>)}
    </div>
  )
}

export default HomePage
