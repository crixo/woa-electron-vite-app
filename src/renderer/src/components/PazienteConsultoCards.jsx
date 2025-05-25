import { PazienteCard } from "./PazienteCard"
import { ConsultoCard } from "./ConsultoCard"

export default function PazienteCosultoCards ({paziente, consulto}) {
    return(
        <div className="flex space-x-4">
          <PazienteCard paziente={paziente} />
          <ConsultoCard consulto={consulto} />
        </div>
    )
}
