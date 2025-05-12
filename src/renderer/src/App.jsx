import { Routes,Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreaPaziente from "./pages/CreaPaziente";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>

      <nav className="bg-gray-800">
        <div className ="container mx-auto p-2">
           <Link to="/"><h2 className="text-white text-2xl font-bold">WOA</h2></Link>
        </div>
      </nav>

      <div className="container mx-auto p-2 h-full">
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="/create" element={<CreaPaziente/>}></Route>
      </Routes>
      </div>
      <ToastContainer />

    </div>
  );
}