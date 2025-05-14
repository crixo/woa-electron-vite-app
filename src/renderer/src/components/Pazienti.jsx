import Paziente from "../components/Paziente"

const Pazienti= ({isVisible, isLoading, pazienti}) => {
    if(!isVisible){
        return null;
    }
    console.log(pazienti)

    return(
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {isLoading ? (
            "Loading"
        // ") : (" == else statement
        //if loading=no, then display product
        ) : (
            // if product more than 0, display product
            <>
            {pazienti.length > 0 ? (
                <>
                {
                    pazienti.map((p,index) => {
                        return (
                            <Paziente key={index} paziente={p} />
                        )
                    })
                }
                </>

            //if product =< 0, display "there is no product"
            ) : (
                <div>
                    There is no product 
                </div>
            ) }
            </>
        )}</div>
    )
    
}
 
export default Pazienti;