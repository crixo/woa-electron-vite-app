import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PazientePage from './pages/PazientePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PazienteProvider } from './contexts/PazienteContext'
import EntityUpsertPage from './pages/EntityUpsertPage'
import { ConsultoProvider } from './contexts/ConsultoContext'
import ConsultoPage from './pages/ConsultoPage'
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
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* do not use py-2 otherwise pages cannot have a top fix bar such as ChatPage */}
        <Routes>
          <Route index element={<HomePage />}></Route>


          <Route path="/:entityType/create" element={<EntityUpsertPage />}></Route>
          <Route path="/paziente/:id" element={<PazientePage />}></Route>
          
          <Route path="/consulto/:id" element={<ConsultoPage />} /> 

          <Route path="/:parentEntityType/:idParent/:entityType/create" element={<EntityUpsertPage />} />
          <Route path="/:entityType/:id/edit" element={ <EntityUpsertPage /> } />

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
