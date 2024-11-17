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
    const [withdrawals, setWithdrawals] = useState([]);
    const [supportTickets, setSupportTickets] = useState([]);

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);


    async function handleFetchCategoryList() {
        const res = await fetch(`${BASE_URL}/categories`, {
            method: "GET", headers
        });
        const data = await res.json();
        console.log(data?.data)
        setCategories(data?.data);
    }


    async function handleFetchEvents() {
        setError(false);
        setLoader(true);
        setEvents([]);
        try {
            const res = await fetch(`${BASE_URL}/events`, { method: "GET", headers });
            const data = await res.json();
            setEvents(data?.data)
        } catch(err) {
            setError(true);
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchWithdrawalData() {
        setError(false);
        setLoader(true);
        setWithdrawals([]);
        try {
            // const res = await fetch(`${BASE_URL}/events`, { method: "GET", headers });
            // const data = await res.json();
            // setWithdrawals(data?.data)
        } catch(err) {
            setError(true);
        } finally {
            setLoader(false);
        }
    }


    async function handleFetchSupportData() {
        setError(false);
        setLoader(true);
        setSupportTickets([]);
        try {
            // const res = await fetch(`${BASE_URL}/events`, { method: "GET", headers });
            // const data = await res.json();
            // setSupportTickets(data?.data)
        } catch(err) {
            setError(true);
        } finally {
            setLoader(false);
        }
    }

    useEffect(function() {
        handleFetchCategoryList()
    }, []);

    
    // CREATE CONTEXT DATA
    let contextData = {
       
        loader,
        error,
        events,
        withdrawals,
        supportTickets,

        ////////////////////////
        categories,

        ///////////////////////
        handleFetchEvents,
        handleFetchSupportData,
        handleFetchWithdrawalData,
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);
