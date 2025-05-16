import { useContext, useEffect, useState } from "react";
import { PazienteContext } from "../data/PazienteContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataTable } from "../components/DataTable"
//


const PazientePage = () => {
    const { id } = useParams(); // Extracts the ID from URL

    const { paziente, fetchPaziente, resetPaziente } = useContext(PazienteContext);
    const [pazienteId, setPazienteId] = useState(id);

    useEffect(() => {
        //resetPaziente();
        fetchPaziente(pazienteId);
      }, []);


    return (
    <div>
        {paziente ? (
        <>
        <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
        <div class="bg-blue-600 p-6 text-white text-center">
            <h2 className="text-xl font-semibold">{paziente.nome}  {paziente.cognome}</h2>
            <p class="opacity-80">Web Developer & Designer</p>
        </div>

        <div class="flex items-center justify-between bg-gray-200 p-4">
            <label htmlFor="toggleDetails" class="font-semibold cursor-pointer">Mostra dettagli ▼</label>
            <Link to={`/paziente/${paziente.ID}/edit`} className="text-blue-500 hover:text-blue-700">
                <i class="fas fa-pencil-alt"></i>
            </Link>
        </div>

        <input type="checkbox" id="toggleDetails" class="hidden peer" />

        <div class="p-6 space-y-2 text-gray-700 hidden peer-checked:block">
            <p><strong>Indirizzo:</strong> Via Roma, 10</p>
            <p><strong>Città:</strong> Torino</p>
            <p><strong>Telefono:</strong> 011-1234567</p>
            <p><strong>Cellulare:</strong> 345-6789012</p>
            <p><strong>Provincia:</strong> TO</p>
            <p><strong>CAP:</strong> 10121</p>
            <p><strong>Email:</strong> cristiano.rossi@email.com</p>
            <p><strong>Data di nascita:</strong> 15/05/1985</p>
        </div>
        </div>

                        
        <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Anamnesi Remote</h3>
            <Link to={`/paziente/${paziente.ID}/anamnesi-remote/create`} className="text-blue-600 hover:underline">
                <i className="fa fa-plus"></i>
            </Link>
        </div>

        <div>
            <DataTable data={paziente.anamnesiRemote} />
        </div>

        <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">Consulti</h3>
            <Link to={`/paziente/${paziente.ID}/consulti/create`} className="text-blue-600 hover:underline">
                <i className="fa fa-plus"></i>
            </Link>
        </div>
        <div>
            <DataTable data={paziente.consulti} />
        </div>
        </>
        ) : (
            <p>No paziente found with id={pazienteId}</p>
        )}
    </div>
    );
};

export default PazientePage;