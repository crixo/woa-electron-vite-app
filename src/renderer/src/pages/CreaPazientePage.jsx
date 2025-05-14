import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PazienteContext } from "../data/PazienteContext";
//import { VITE_BACKEND_URL } from "../App";

const CreaPazientePage = () => {

    const [nome, setNome] =useState("");
    const [cognome,setCognome] =useState("");
    const [professione,setProfessione] =useState("");
    const [indirizzo, setIndirizzo] =useState("");
    const [citta,setCitta] =useState("");
    const [telefono,setTelefono] =useState("");
    const [cellulare, setCellulare] =useState("");
    const [prov,setProv] =useState("");
    const [cap,setCap] =useState("");    
    const [email,setEmail] =useState("");   
    const [dataDiNascita,setDataDiNascita] =useState("");

    const [isLoading,setIsLoading] =useState("");
    const navigate = useNavigate();
    const { paziente, addPaziente, resetPaziente } = useContext(PazienteContext);
 
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        // start the component with no paziente stored into Context 
        // otherwise useEffect will be triggered before creating a new entity
        resetPaziente();
        setIsReady(true);
    }, []);// Empty dependency array ensures it runs once at the start


    useEffect(() => {
        if(paziente){
            onPazienteCreated();
        }
    }, [paziente]); // Runs when `paziente` changes    

    const savePaziente= async (e) => {
        e.preventDefault();
        if(nome === "" || cognome === "" || dataDiNascita === "") {
            
            toast.warn('please fill all input completely', {
                position: 'top-right'
            });
            return;
        }
        try{
            setIsLoading(true);
            
            const p = 
            {
                nome: nome,
                cognome:cognome,
                professione:professione,
                indirizzo:indirizzo,
                citta:citta,
                telefono:telefono,
                cellulare:cellulare,
                prov:prov,
                cap:cap,
                email:email,
                data_nascita:dataDiNascita
            };
            let newP = addPaziente(p);//neither wait or then((p)=>p); blocks to have paziente updated into the Context
            console.log(paziente);//is null
        }catch (error){
            toast.error(error.message, {
                position: 'top-center'
            });

            setIsLoading(false);
        }
    }

    const onPazienteCreated = () => {
        if(!isReady) return;
        console.log(paziente);

        toast.success(`save ${paziente.nome} ${paziente.cognome} successuflly`, {
            position: 'top-center'
        })

        setIsLoading(false);
        navigate("/paziente/"+paziente.id);
    }
 
    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
           <h2 className="font-semibold text-2xl mb-4 block text-center">
           Create a Product
           </h2>
            <form onSubmit={savePaziente}>
                <div className="space-y-2">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Nome"/>
                </div>

                <div className="space-y-2">
                    <label>Cognome</label>
                    <input 
                        type="text" 
                        value={cognome} 
                        onChange={(e) => setCognome(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Cognome"/>
                </div>
                <div className="space-y-2">
                    <label>Professione</label>
                    <input 
                        type="text" 
                        value={professione} 
                        onChange={(e) => setProfessione(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Professione"/>
                </div>
                <div className="space-y-2">
                    <label>Indirizzo</label>
                    <input 
                        type="text" 
                        value={indirizzo} 
                        onChange={(e) => setIndirizzo(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Indirizzo"/>
                </div>
                <div className="space-y-2">
                    <label>Citta</label>
                    <input 
                        type="text" 
                        value={citta} 
                        onChange={(e) => setCitta(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Citta"/>
                </div>
                <div className="space-y-2">
                    <label>Telefono</label>
                    <input 
                        type="text" 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Telefono"/>
                </div>
                <div className="space-y-2">
                    <label>Cellulare</label>
                    <input 
                        type="text" 
                        value={cellulare} 
                        onChange={(e) => setCellulare(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Cellulare"/>
                </div>
                <div className="space-y-2">
                    <label>Provincia</label>
                    <input 
                        maxLength="2"
                        type="text" 
                        value={prov} 
                        onChange={(e) => setProv(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Provincia"/>
                </div>
                <div className="space-y-2">
                    <label>CAP</label>
                    <input 
                        type="text" 
                        value={cap} 
                        onChange={(e) => setCap(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter CAP"/>
                </div>
                <div className="space-y-2">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Email"/>
                </div>
                <div className="space-y-2">
                    <label>Data di Nascita</label>
                    <input 
                        type="date" 
                        value={dataDiNascita} 
                        onChange={(e) => setDataDiNascita(e.target.value)} 
                        className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus shadoow-outline focus:border-blue-200 placeholder-gray-400" placeholder="enter Data di Nascita"/>
                </div>
                <div>
                    {!isLoading && (
                        <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Crea Paziente</button>
                    )}
                    
                </div>
            </form>
        </div>
    );
}

export default CreaPazientePage;