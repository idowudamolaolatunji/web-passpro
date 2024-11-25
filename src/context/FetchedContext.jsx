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
    const { headers, shouldKick, handleUser } = useAuthContext();

    const [categories, setCategories] = useState([]);
    const [ticketOrders, setTicketOrders] = useState([]);
    const [events, setEvents] = useState([]);
    const [withdrawalsHistory, setWithdrawalsHistory] = useState([]);
    const [supportTickets, setSupportTickets] = useState([]);

    const [loader, setLoader] = useState(true);
    const [error, setError] = useState("");

    async function handleFetchUserData() {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, { method: "GET", headers });
        shouldKick(res)

        const data = await res.json();
        handleUser(data)
    }

    async function handleToggleFeaturedEvent(eventId) {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/event/${eventId}/toggle-feature`, { method: "PUT", headers });
        shouldKick(res)
        const data = await res.json();
        console.log(res, data)
        handleFetchEvents();
    }

    async function handleFetchCategoryList() {
        const res = await fetch(`${BASE_URL}/categories`, { method: "GET", headers });
        const data = await res.json();
        setCategories(data?.data);
    }

    // const message = err?.message?.includes("CONNECTION") && err?.message == "Failed to fetch") ? "Server busy or Check your internet connection" : err?.message;

    async function handleFetchTicketOrders() {
        setError("");
        setLoader(true);
        setTicketOrders([]);
        try {
            const res = await fetch(`${BASE_URL}/orders`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setTicketOrders(data?.data)
        } catch(err) {
            const message = err?.message == "Failed to fetch" ? "Server busy or Check your internet connection" : err?.message;
            setError(message);
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchEvents() {
        setError("");
        setLoader(true);
        setEvents([]);
        try {
            const res = await fetch(`${BASE_URL}/events`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setEvents(data?.data)
        } catch(err) {
            const message = err?.message == "Failed to fetch" ? "Server busy or Check your internet connection" : err?.message;
            setError(message);
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchWithdrawalsHistory() {
        setError("");
        setLoader(true);
        setWithdrawalsHistory([]);
        try {
            const res = await fetch(`${BASE_URL}/transactions`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setWithdrawalsHistory(data?.data)
        } catch(err) {
            const message = err?.message == "Failed to fetch" ? "Server busy or Check your internet connection" : err?.message;
            setError(message);
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchSupportData() {
        setError("");
        setLoader(true);
        setSupportTickets([]);
        try {
            const res = await fetch(`${BASE_URL}/support-tickets`, { method: "GET", headers });
            shouldKick(res);

            const data = await res.json();
            setSupportTickets(data?.data);
        } catch(err) {
            const message = err?.message == "Failed to fetch" ? "Server busy or Check your internet connection" : err?.message;
            setError(message);
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
        handleFetchUserData,
        handleFetchSupportData,
        handleFetchTicketOrders,
        handleToggleFeaturedEvent,
        handleFetchWithdrawalsHistory,
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);
