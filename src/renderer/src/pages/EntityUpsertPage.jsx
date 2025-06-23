import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PazienteContext } from '../contexts/PazienteContext'
import { ConsultoContext } from '../contexts/ConsultoContext'
import { PazienteCard } from '../components/PazienteCard'
import PazienteConsultoCards from '../components/PazienteConsultoCards'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSettings } from '../contexts/SettingsContext'
import { validate  } from '../utils/formUtils'

import PazienteForm from '../components/PazienteForm'

import ConsultoForm from '../components/ConsultoForm'
import AnamnesiRemotaForm from '../components/AnamnesiRemotaForm'

import AnamnesiProssimaForm from '../components/AnamnesiProssimaForm'
import EsameForm from '../components/EsameForm'
import TrattamentoForm from '../components/TrattamentoForm'
import ValutazioneForm from '../components/ValutazioneForm'

const EntityUpsertPage = () => {
  console.log('d')
  const { paziente, addPaziente, updatePaziente, tipoAnamnesi } = useContext(PazienteContext)
  const { consulto, add, update, 
    addEsame, updateEsame, tipoEsami, 
    addAnamnesiProssima, updateAnamnesiProssima,
    addTrattamento, updateTrattamento,
    addValutazione, updateValutazione  } = useContext(ConsultoContext)
  const navigate = useNavigate()
  const { id, entityType } = useParams() // Extracts the ID from URL

  const entityMapper = {
    
    paziente: {
      instanceFinder: (id) =>id? paziente : {},
      pageTitle: (id) => id? "Modifica Paziente" : 'Crea Paziente',
      persist: (id) => id? updatePaziente : addPaziente,
      lkp: null,
      component: PazienteForm,
      navigateTo: (p,c) => null,
      cardComponent: id? <PazienteCard paziente={paziente} /> : null
    },

    'anamnesi-remota': {
      instanceFinder: (id) =>id? paziente.anamnesiRemote.find(e=>e.ID==id) : {ID_paziente:paziente.ID },
      pageTitle: (id) => id? "Modifica Anamnesi Remota" : 'Crea nuova Anamnesi Remota',
      persist: (id) => id? dal.updateAnamnesiRemota : dal.addAnamnesiRemota,
      lkp: tipoAnamnesi,
      component: AnamnesiRemotaForm,
      navigateTo: (p,c) => `/paziente/${p.ID}`,
      cardComponent: <PazienteCard paziente={paziente} />
    },
    consulto: {
      instanceFinder: (id) =>id? paziente.consulti.find(e=>e.ID==id) : {ID_paziente:paziente.ID },
      pageTitle: (id) => id? "Modifica Consulto" : 'Crea un nuovo Consulto',
      persist: (id) => id? update : add,
      lkp: null,
      component: ConsultoForm,
      navigateTo: (p,c) => `/paziente/${p.ID}`,
      cardComponent: <PazienteCard paziente={paziente} />
    },
    'anamnesi-prossima': {
      instanceFinder: (id) =>id? consulto.anamnesiProssime.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Anamnesi Prossima" : 'Crea Anamnesi Prossima',
      persist: (id) => id? updateAnamnesiProssima : addAnamnesiProssima,
      lkp: null,
      component: AnamnesiProssimaForm,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />
    },
    esame: {
      instanceFinder: (id) =>id? consulto.esami.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Esame" : 'Crea un nuovo Esame',
      persist: (id) => id? updateEsame : addEsame,
      lkp: tipoEsami,
      component: EsameForm,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />
    },
    trattamento: {
      instanceFinder: (id) =>id? consulto.trattamenti.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Trattanento" : 'Crea Trattanento',
      persist: (id) => id? updateTrattamento : addTrattamento,
      lkp: null,
      component: TrattamentoForm,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />
    },
    valutazione: {
      instanceFinder: (id) =>id? consulto.valutazioni.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Valutazione" : 'Crea Valutazione',
      persist: (id) => id? updateValutazione: addValutazione,
      lkp: null,
      component: ValutazioneForm,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />
    }
  }
  console.log(id, entityType, consulto)
  const settings = useSettings()
  const entityMapped = entityMapper[entityType]
  const FormComponent = entityMapped.component
  const entity = entityMapped.instanceFinder(id)
  const persist = entityMapped.persist(id)
  const pageTitle = entityMapped.pageTitle(id)
  const lkp = entityMapped.lkp
  const navigateTo = entityMapped.navigateTo(paziente, consulto)
  const CardComponent = entityMapped.cardComponent
  const mandatoryFields = settings.validations[entityType]


  const saveEntity = async (formData) => {
    const warnMessage = validate(mandatoryFields, formData, )
    if(warnMessage){
      toast.warn(warnMessage, {
        position: 'top-right'
      })
      return
    }
    try {
      const successMessage = 'Entità salvata con succeso'
      //setIsLoading(true);

      const enityPersisted = await persist(formData)      
      toast.success(successMessage, {
        position: 'top-center'
      })
      //setIsLoading(false);
      if(entityType=='paziente'){
        navigate('/paziente/' + enityPersisted.ID)
      }else{
        navigate(navigateTo)
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center'
      })
      //setIsLoading(false);
    }  
  }

  return (
    <>
    {CardComponent}
    <h3 className="h3-primary">{pageTitle}</h3>
    <FormComponent entity={entity} onSubmit={saveEntity} mandatoryFields={mandatoryFields} tipi={lkp} />
    </>
  )
}

export default EntityUpsertPage
