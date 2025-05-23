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

  const getPazienti = async (pageNumber = 0) => {
    //e.preventDefault()

    try {
      //start loading
      //setIsLoading(true)
      console.log('pageNumber:'+pageNumber)
      setSearchNumber(searchNumber+1)

      const pageSize = 5
      let rawResponse = await dal.getPazienti(searchCriteria, pageSize+1, pageNumber-1)
      console.log(rawResponse)
      const pazientiFromDb = JSON.parse(rawResponse)
      console.log('pazientiFromDb.length:'+pazientiFromDb.length)
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

//   useEffect(() => {
//     console.log("Updated pazienti:", pazienti.length);
// }, [pazienti]); // Runs every time users change

  return (
    //if loading=yes, then display "loading"
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-lg px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer"
        >
          Crea un nuovo paziente
        </Link>
      </div>

      <form>
        <div className="space-y-2">
          <label>Cognome del paziente da cercare</label>
          <input
            type="text"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="enter paziente da cercare"
          />
        </div>
        <div>
          <button onClick={(e) => {e.preventDefault(); getPazienti(1)}} className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
            Cerca Paziente
          </button>
        </div>
      </form>

      {pazienti.length > 0  ? (
        <>
          <div className="cards">
            {pazienti.map((p, index) => (
              <div key={index} className="card">
                <Paziente key={index} paziente={p} />
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
              onClick={() => getPazienti(currentPage - 1)} 
              disabled={currentPage === 1}>
              Previous
            </button>
            <span className="px-4 py-2 bg-purple-500 text-white font-bold shadow-md">Page {currentPage}</span>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
              onClick={() => getPazienti(currentPage + 1)} 
              disabled={!hasMore}>
              Next
            </button>
          </div>
        </>
      ) : ( searchNumber>0  && <>no pazienti found</>)}
    </div>
  )
}

export default HomePage
