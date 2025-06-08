import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreaPazientePage from './pages/CreaPazientePage'
import ModificaPazientePage from './pages/ModificaPazientePage'
import PazientePage from './pages/PazientePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PazienteProvider } from './contexts/PazienteContext'
import CreaAnamnesiRemotaPage from './pages/CreaAnamnesiRemotaPage'
import ModificaAnamnesiRemotaPage from './pages/ModificaAnamnesiRemotaPage'
import { ConsultoProvider } from './contexts/ConsultoContext'
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
import { SettingsProvider } from "./contexts/SettingsContext";
import CustomErrorBoundary from './components/CustomErrorBoundary'
import TopBar from './components/TopBar'
import ChatPage from './pages/ChatPage'
import { LayoutProvider, useLayout } from './contexts/LayoutContext';


const AppLayout = () => {
  const { bottomSection } = useLayout();
  return (
    <div className="h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <div className="h-screen flex flex-col">
        {/* Fixed Navigation Bar */}
        <TopBar />

        {/* Main Scrollable Content Area */}
        <main id="main-content" class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">  
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/create" element={<CreaPazientePage />}></Route>
          <Route path="/paziente/:id" element={<PazientePage />}></Route>
          <Route path="/paziente/:id/edit" element={<ModificaPazientePage />}></Route>
          <Route path="/paziente/:id/anamnesi-remote/create" element={<CreaAnamnesiRemotaPage />} />
          <Route path="/anamnesi-remota/:id/edit" element={ <ModificaAnamnesiRemotaPage /> } />         
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
          <Route path="/chat" element={ <ChatPage />}></Route>
        </Routes>
          </div>   
        </main> 

        {/* Dynamic Bottom Section */}
        {bottomSection}  

        <ToastContainer />
      </div>
    </div>
  )     
}

function App() {
  
  return (
    <CustomErrorBoundary>
    <SettingsProvider>
    <PazienteProvider>
    <ConsultoProvider>
    <LayoutProvider>
      <AppLayout />
    </LayoutProvider>
    </ConsultoProvider> 
    </PazienteProvider>
    </SettingsProvider>
    </CustomErrorBoundary>
  )
}

export default App;
