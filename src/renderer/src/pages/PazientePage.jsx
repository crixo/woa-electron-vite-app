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
                <div>
                    <h2>{paziente.nome}  {paziente.cognome}</h2>
                    <Link to={`/paziente/${paziente.ID}/edit`}>Modifica</Link>
                </div>
                <div>
                    <Link to={`/paziente/${paziente.ID}/anamnesi-remota/create`}>Crea Anamnesi Remota</Link>
                </div>
                <div>
                    <DataTable data={paziente.anamnesiRemote} />
                </div>
            </>
            ) : (
                <p>No paziente found with id={pazienteId}</p>
            )}
        </div>
    );
};

export default PazientePage;