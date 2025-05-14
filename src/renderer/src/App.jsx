import { Routes,Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreaPazientePage from "./pages/CreaPazientePage";
import ModificaPazientePage from "./pages/ModificaPazientePage";
import PazientePage from "./pages/PazientePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PazienteProvider } from "./data/PazienteContext";

export default function App() {
  return (
    <PazienteProvider>
    <div>

      <nav className="bg-gray-800">
        <div className ="container mx-auto p-2">
           <Link to="/"><h2 className="text-white text-2xl font-bold">WOA</h2></Link>
        </div>
      </nav>

      <div className="container mx-auto p-2 h-full">
      <Routes>
        <Route index element={<HomePage/>}></Route>
        <Route path="/create" element={<CreaPazientePage/>}></Route>
        <Route path="/paziente/:id" element={<PazientePage/>}></Route>
        <Route path="/paziente/:id/edit" element={<ModificaPazientePage/>}></Route>
      </Routes>
      </div>
      <ToastContainer />

    </div>
    </PazienteProvider>
  );
}