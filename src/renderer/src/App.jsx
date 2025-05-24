import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreaPazientePage from './pages/CreaPazientePage'
import ModificaPazientePage from './pages/ModificaPazientePage'
import PazientePage from './pages/PazientePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PazienteProvider } from './data/PazienteContext'
import { AnamnesiRemotaProvider } from './data/AnamnesiRemotaContext'
import CreaAnamnesiRemotaPage from './pages/CreaAnamnesiRemotaPage'
import ModificaAnamnesiRemotaPage from './pages/ModificaAnamnesiRemotaPage'
import { ConsultoProvider } from './data/ConsultoContext'
import CreaConsultoPage from './pages/CreaConsultoPage'
import ModificaConsultoPage from './pages/ModificaConsultoPage'
import ConsultoPage from './pages/ConsultoPage'
import CreaEsamePage from './pages/CreaEsamePage'
import ModificaEsamePage from './pages/ModificaEsamePage'
import CreaTrattamentoPage from './pages/CreaTrattamentoPage'
import ModificaTrattamentoPage from './pages/ModificaTrattamentoPage'
import CreaAnamnesiProssimaPage from './pages/CreaAnamnesiProssimaPage'
import ModificaAnamnesiProssimaPage from './pages/ModificaAnamnesiProssimaPage'
import CreaValutazionePage from './pages/CreaValutazionePage'
import ModificaValutazionePage from './pages/ModificaValutazionePage'
import ErrorBoundary from './components/ErrorBoundary';


export default function App() {
  return (
     <ErrorBoundary>
    <PazienteProvider>
      <ConsultoProvider>
      <div>
        <nav className="bg-gray-800">
          <div className="container mx-auto p-2">
            <Link to="/">
              <h2 className="text-white text-2xl font-bold">WOA</h2>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto p-2 h-full">
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="/create" element={<CreaPazientePage />}></Route>
            <Route path="/paziente/:id" element={<PazientePage />}></Route>
            <Route path="/paziente/:id/edit" element={<ModificaPazientePage />}></Route>
            <Route
              path="/paziente/:id/anamnesi-remote/create"
              element={
                <AnamnesiRemotaProvider>
                  <CreaAnamnesiRemotaPage />
                </AnamnesiRemotaProvider>
              }
            />
            <Route
              path="/anamnesi-remota/:id/edit"
              element={
                <AnamnesiRemotaProvider>
                  <ModificaAnamnesiRemotaPage />
                </AnamnesiRemotaProvider>
              }
            />         
            <Route path="/paziente/:id/consulti/create" element={<CreaConsultoPage />} />
            <Route path="/consulto/:id/edit" element={<ModificaConsultoPage />}  />    
            <Route path="/consulto/:id" element={<ConsultoPage />} />    

            <Route path="/anamnesi-prossima/:id/edit" element={ <ModificaAnamnesiProssimaPage />}></Route>
            <Route path="/consulto/:id/anamnesi-prossime/create" element={ <CreaAnamnesiProssimaPage />}></Route>     

            <Route path="/esame/:id/edit" element={ <ModificaEsamePage />}></Route>
            <Route path="/consulto/:id/esami/create" element={ <CreaEsamePage />}></Route>

            <Route path="/trattamento/:id/edit" element={ <ModificaTrattamentoPage />}></Route>
            <Route path="/consulto/:id/trattamenti/create" element={ <CreaTrattamentoPage />}></Route>          

            <Route path="/valutazione/:id/edit" element={ <ModificaValutazionePage />}></Route>
            <Route path="/consulto/:id/valutazioni/create" element={ <CreaValutazionePage />}></Route>                
          </Routes>         
        </div>
        <ToastContainer />
      </div>
      </ConsultoProvider> 
    </PazienteProvider>
    </ErrorBoundary>
  )
}
