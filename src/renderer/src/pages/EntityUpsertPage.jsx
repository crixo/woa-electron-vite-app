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

import FormBuilder from '../components/FormBuilder'

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
      navigateTo: (p,c) => null,
      cardComponent: id? <PazienteCard paziente={paziente} /> : null,
      fields:[ 
        {label:'Nome', name:'nome', kind:'input', type:'text'}, 
        {label:'Cognome', name:'cognome', kind:'input', type:'text'}, 
        {label:'Professione', name:'professione', kind:'input', type:'text'}, 
        {label:'Indirizzo', name:'indirizzo', kind:'input', type:'text'}, 
        {label:'Città', name:'citta', kind:'input', type:'text'}, 
        {label:'Provincia', name:'prov', kind:'input', type:'text'}, 
        {label:'CAP', name:'cap', kind:'input', type:'text'}, 
        {label:'Telefono', name:'telefono', kind:'input', type:'text'}, 
        {label:'Cellulare', name:'cellulare', kind:'input', type:'text'}, 
        {label:'Email', name:'email', kind:'input', type:'text'}, 
        {label:'Data di Nascita', name:'data_nascita', kind:'input', type:'date'} ]
    },

    'anamnesi-remota': {
      instanceFinder: (id) =>id? paziente.anamnesiRemote.find(e=>e.ID==id) : {ID_paziente:paziente.ID },
      pageTitle: (id) => id? "Modifica Anamnesi Remota" : 'Crea nuova Anamnesi Remota',
      persist: (id) => id? dal.updateAnamnesiRemota : dal.addAnamnesiRemota,
      lkp: tipoAnamnesi,
      navigateTo: (p,c) => `/paziente/${p.ID}`,
      cardComponent: <PazienteCard paziente={paziente} />,
      fields:[ 
        {label:'Data', name:'data', kind:'input', type:'date'} ,
        {label:'Tipo', name:'tipo', kind:'select', options:tipoAnamnesi} ,
        {label:'Descrizioneme', name:'descrizione', kind:'input', type:'text'}, 
      ]
    },
    consulto: {
      instanceFinder: (id) =>id? paziente.consulti.find(e=>e.ID==id) : {ID_paziente:paziente.ID },
      pageTitle: (id) => id? "Modifica Consulto" : 'Crea un nuovo Consulto',
      persist: (id) => id? update : add,
      lkp: null,
      navigateTo: (p,c) => `/paziente/${p.ID}`,
      cardComponent: <PazienteCard paziente={paziente} />,
      fields:[ 
        {label:'Data', name:'data', kind:'input', type:'date'} ,
        {label:'Problema Iniziale', name:'problema_iniziale', kind:'input', type:'text'}, 
      ]
    },
    'anamnesi-prossima': {
      instanceFinder: (id) =>id? consulto.anamnesiProssime.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Anamnesi Prossima" : 'Crea Anamnesi Prossima',
      persist: (id) => id? updateAnamnesiProssima : addAnamnesiProssima,
      lkp: null,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />,
      fields:[ 
        {label:'Prima Volta', name:'prima_volta', kind:'input', type:'text'}, 
        {label:'Tipologia', name:'tipologia', kind:'input', type:'text'}, 
        {label:'Localizzazione', name:'localizzazione', kind:'input', type:'text'}, 
        {label:'Irradiazione', name:'irradiazione', kind:'input', type:'text'}, 
        {label:'Periodo Insorgenza', name:'periodo_insorgenza', kind:'input', type:'text'}, 
        {label:'Durata', name:'durata', kind:'input', type:'text'}, 
        {label:'Familiarità', name:'familiarita', kind:'input', type:'text'}, 
        {label:'Altre Terapie', name:'altre_terapie', kind:'input', type:'text'}, 
        {label:'Varie', name:'varie', kind:'input', type:'text'},
      ]
    },
    esame: {
      instanceFinder: (id) =>id? consulto.esami.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Esame" : 'Crea un nuovo Esame',
      persist: (id) => id? updateEsame : addEsame,
      lkp: tipoEsami,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />,
      fields:[ 
        {label:'Data', name:'data', kind:'input', type:'date'} ,
        {label:'Tipo', name:'tipo', kind:'select', options:tipoEsami} ,
        {label:'Descrizioneme', name:'descrizione', kind:'input', type:'text'}, 
      ]
    },
    trattamento: {
      instanceFinder: (id) =>id? consulto.trattamenti.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Trattanento" : 'Crea Trattanento',
      persist: (id) => id? updateTrattamento : addTrattamento,
      lkp: null,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />,
      fields:[ 
        {label:'Data', name:'data', kind:'input', type:'date'} ,
        {label:'Descrizioneme', name:'descrizione', kind:'input', type:'text'}, 
      ]
    },
    valutazione: {
      instanceFinder: (id) =>id? consulto.valutazioni.find(e=>e.ID==id) : {ID_paziente:consulto.ID_paziente, ID_consulto:consulto.ID },
      pageTitle: (id) => id? "Modifica Valutazione" : 'Crea Valutazione',
      persist: (id) => id? updateValutazione: addValutazione,
      lkp: null,
      navigateTo: (p,c) => `/consulto/${c.ID}`,
      cardComponent: <PazienteConsultoCards paziente={paziente} consulto={consulto} />,
      fields:[ 
        {label:'Strutturale', name:'strutturale', kind:'input', type:'text'} ,
        {label:'Cranio-Sacrale', name:'cranio_sacrale', kind:'input', type:'text'}, 
        {label:'AK Ortodontica', name:'ak_ortodontica', kind:'input', type:'text'}, 
      ]
    }
  }

  const fieldsWithRequiredAttribute = (entityFields, entityMandatoryFields) => {
    return entityFields.map( (field) => {
      field.required = entityMandatoryFields && field.name in entityMandatoryFields && entityMandatoryFields[field.name]=='mandatory'
      return field
    })
  }

  console.log(id, entityType, consulto)
  const settings = useSettings()
  const mandatoryFields = settings.validations[entityType]

  const entityMapped = entityMapper[entityType]
  const FormComponent = entityMapped.component
  const entity = entityMapped.instanceFinder(id)
  const persist = entityMapped.persist(id)
  const pageTitle = entityMapped.pageTitle(id)
  const lkp = entityMapped.lkp
  const navigateTo = entityMapped.navigateTo(paziente, consulto)
  const CardComponent = entityMapped.cardComponent
  const fields = fieldsWithRequiredAttribute(entityMapped.fields, mandatoryFields)
  console.log(fields)
  
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
    {/* <FormComponent entity={entity} onSubmit={saveEntity} mandatoryFields={mandatoryFields} tipi={lkp} /> */}
    <FormBuilder entity={entity} onSubmit={saveEntity} fields={fields} />
    </>
  )
}

export default EntityUpsertPage
