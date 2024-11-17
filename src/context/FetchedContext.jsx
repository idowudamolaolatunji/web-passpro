import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const FetchedContext = createContext();
export default FetchedContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////


export const FetchedProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_V1;
    const { headers } = useAuthContext();

    const [categories, setCategories] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventLoader, setEventLoader] = useState(false);
    const [eventError, setEventError] = useState(false);

    const loader = {
        eventLoader,
    }

    const error = {
        eventError,
    }

    async function handleFetchCategoryList() {
        const res = await fetch(`${BASE_URL}/categories`, {
            method: "GET", headers
        });
        const data = await res.json();
        console.log(data?.data)
        setCategories(data?.data);
    }

    async function handleFetchEvents() {
        setEventError(false);
        setEventLoader(true);
        setEvents([]);
        try {
            const res = await fetch(`${BASE_URL}/events`, { method: "GET", headers });
            const data = await res.json();
            setEvents(data?.data)
        } catch(err) {
            setEventError(true);
        } finally {
            setEventLoader(true);
        }
    }

    useEffect(function() {
        // handleFetchEvents()
        // handleFetchCategoryList()
    }, [])
    
    // CREATE CONTEXT DATA
    let contextData = {
       
        loader,
        error,
        events,

        ////////////////////////
        categories,

        ///////////////////////
        handleFetchEvents
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);
