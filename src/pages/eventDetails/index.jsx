import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTop from '../../components/PageTop';
import EventPreview from '../../components/EventPreview';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../context/AuthContext';

function index() {
    const { id } = useParams();
    const { headers, shouldKick } = useAuthContext();
    const BASE_URL = import.meta.env.VITE_BASE_URL_V1;

    const [event, setEvent] = useState(null)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")

    async function handleFetchEvent() {
        setError("");
        setLoader(true);
        setEvent(null);

        try {
            const res = await fetch(`${BASE_URL}/events/${id}`, { method: "GET", headers });
            shouldKick(res)
            if (res.status == 500) throw new Error("Server is Busy")
            const data = await res.json();
            setEvent(data?.data)
        } catch (err) {
            const message = err?.message == "Failed to fetch" ? "Server is Busy" : "Check internet connection"
            setError(message);
        } finally {
            setLoader(false);
        }
    }

    useEffect(function () {
        handleFetchEvent()
    }, [id])

    return (
        <>
            <PageTop title="Details" prev="All Events" />

            {(loader && !event) && <Spinner />}

            {(!loader && !error && event) && (
                <EventPreview
                    customStyle={{ padding: "2rem", borderRadius: ".4rem" }}
                    noHead={true}
                    eventData={event}
                    cover_photo={"https://sub.passpro.africa/storage/" + event?.gallery?.cover_photo}
                    event_image={"https://sub.passpro.africa/storage/" + event?.gallery?.event_image}
                />
            )}
        </>
    )
}

export default index