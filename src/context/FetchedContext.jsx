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
    const { headers, shouldKick } = useAuthContext();

    const [categories, setCategories] = useState([]);
    const [ticketOrders, setTicketOrders] = useState([]);
    const [events, setEvents] = useState([]);
    const [withdrawalsHistory, setWithdrawalsHistory] = useState([]);
    const [supportTickets, setSupportTickets] = useState([]);

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);


    async function handleFetchCategoryList() {
        const res = await fetch(`${BASE_URL}/categories`, {
            method: "GET", headers
        });
        
        const data = await res.json();
        setCategories(data?.data);
    }


    async function handleFetchTicketOrders() {
        setError(false);
        setLoader(true);
        setTicketOrders([]);
        try {
            const res = await fetch(`${BASE_URL}/orders`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            console.log(data)
            setTicketOrders(data?.data)
        } catch(err) {
            setError(true);
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchEvents() {
        setError(false);
        setLoader(true);
        setEvents([]);
        try {
            const res = await fetch(`${BASE_URL}/events`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setEvents(data?.data)
        } catch(err) {
            setError(true);
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchWithdrawalsHistory() {
        setError(false);
        setLoader(true);
        setWithdrawalsHistory([]);
        try {
            const res = await fetch(`${BASE_URL}/transactions`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setWithdrawalsHistory(data?.data)
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
            const res = await fetch(`${BASE_URL}/support-tickets`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setSupportTickets(data?.data);
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
        setLoader,
        error,
        setError,

        events,
        ticketOrders,
        withdrawalsHistory,
        supportTickets,

        ////////////////////////
        categories,

        ///////////////////////
        handleFetchEvents,
        handleFetchSupportData,
        handleFetchTicketOrders,
        handleFetchWithdrawalsHistory,
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);
