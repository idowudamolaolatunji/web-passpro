import { createContext, useState, useEffect, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const FetchedContext = createContext();
export default FetchedContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////


export const FetchedProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [events, setEvents] = useState([]);
    const [eventLoader, setEventLoader] = useState(false);
    const [eventError, setEventError] = useState(false);

    const loader = {
        eventLoader,
    }

    const error = {
        eventError,
    }

    async function handleFetchEvents() {
        setEventError(false);
        setEventLoader(true);
        setEvents([]);

        try {

            // const res = await fetch(`${BASE_URL}/events`, {
            //     method: "GET",

            // });

        } catch(err) {
            setEventError(true);
        } finally {
            setEventLoader(true);
        }
    }

    useEffect(function() {
        // handleFetchEvents()
    }, [])
    
    // CREATE CONTEXT DATA
    let contextData = {
       
        loader,
        error,
        events
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);
