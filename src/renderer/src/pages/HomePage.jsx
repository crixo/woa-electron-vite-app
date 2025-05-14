import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pazienti from "../components/Pazienti"
//import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {
    const [searchCriteria, setSearchCriteria] = useState('');

    const [showPazienti, setShowPazienti]= useState(false);

    const [ pazienti, setPazienti] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPazienti =  async (e) => {
        e.preventDefault();

        try{
            //start loading
            setIsLoading(true);

            // const response = {"data":[
            //     {"nome":"John", "cognome":"Doe"},
            //     {"nome":"Tom", "cognome":"Hanks"},]}//await axios.get(`https://be-node-api.onrender.com/api/products`);
            let rawResponse = await dal.getPazienti(searchCriteria);
            console.log(rawResponse); 

            const response = {"data":JSON.parse(rawResponse)};
            //let data = JSON.parse('[{"ID":2,"cognome":"Degiorgis","nome":"Cristiano","professione":null,"indirizzo":null,"citta":null,"telefono":null,"cellulare":null,"prov":null,"cap":null,"email":null,"data_nascita":"1972-10-05T00:00:00Z","created_at_utc":null,"updated_at_utc":null}]');//JSON.parse(rawResponse);

            //set product into product variable from response data
            setPazienti(response.data);

            //loading is finish
            setIsLoading(false);

            setShowPazienti(true);
        }catch (error){
            console.log(error);
        }
    }

    //call useeffect when application first load
    // useEffect(() => {
    //     getPazienti();
    // },[])

    return (
        //if loading=yes, then display "loading"
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-lg px-4 py-2 font-bold hover:bg-blue-500 hover:cursor-pointer">Crea un nuovo paziente</Link>
            </div>

            <form onSubmit={getPazienti}>
                <div className="space-y-2">
                    <label>Cognome del paziente da cercare</label>
                    <input 
                        type="text" 
                        value={searchCriteria} 
                        onChange={(e) => setSearchCriteria(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter paziente da cercare"/>
                </div>
                <div>
                    <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Cerca Paziente</button>
                </div>    
            </form>

            <Pazienti isVisible={showPazienti} isLoading={isLoading} pazienti={pazienti} />
        </div>
    );
    
}

export default HomePage;