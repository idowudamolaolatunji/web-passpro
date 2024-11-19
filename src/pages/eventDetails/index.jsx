import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTop from '../../components/PageTop';
import EventPreview from '../../components/EventPreview';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../context/AuthContext';

function index() {
    const { id } = useParams();
    const { headers } = useAuthContext();
    const BASE_URL = import.meta.env.VITE_BASE_URL_V1;

    const [event, setEvent] = useState(null)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    async function handleFetchEvent() {
        setError(false);
        setLoader(true);
        setEvent(null);

        try {
            const res = await fetch(`${BASE_URL}/events/${id}`, { method: "GET", headers });
            const data = await res.json();
            setEvent(data?.data)
        } catch(err) {
            setError(true);
        } finally {
            setLoader(false);
        }
    }

    useEffect(function() {

        handleFetchEvent()
    }, [id])

    console.log(id, loader, event)

  return (
    <>
        <PageTop title="Details" prev="All Events" />

        {(loader && !event) && <Spinner />} 

        {(!loader && !error && event) && (
            <EventPreview 
                customStyle={{ padding: "2rem", borderRadius: ".4rem" }}
                noHead={true}
                eventData={event}
                cover_photo={event?.cover_photo} 
                event_image={event?.event_image}
            />
        )}
    </>
  )
}

export default index