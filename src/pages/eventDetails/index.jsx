import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageTop from '../../components/PageTop';
import EventPreview from '../../components/EventPreview';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../context/AuthContext';
import { useWindowSize } from 'react-use';
import DeleteModal from '../../components/DeleteModal';
import CustomAlert from '../../components/CustomAlert';

function index() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { headers, shouldKick } = useAuthContext();
    const BASE_URL = import.meta.env.VITE_BASE_URL_V1;

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [response, setResponse] = useState({ status: "", message: "" });

    async function handleFetchEvent() {
        setError("");
        setLoading(true);
        setEvent(null);
        setResponse({ status: "", message: "" });

        try {
            const res = await fetch(`${BASE_URL}/events/${id}`, { method: "GET", headers });
            shouldKick(res)

            const data = await res.json();
            setEvent(data?.data);
            setResponse({ status: "success", message: "success" });
        } catch (err) {
            const message = err?.message == "Failed to fetch" ? "Server busy or Check your internet connection" : err?.message;
            setResponse({ status: "success", message });
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    // DELETE AN EVENT
    async function handleDeleteEvent() {
        setLoading(true);
        setResponse({ message: "", status: "" });
        try {
            const res = await fetch(`${BASE_URL}/events/${id}`, { method: "DELETE", headers });
            shouldKick(res)

            const data = await res.json();
            if (res.status != 200) throw new Error(data?.message || data?.error);
            setShowDeleteModal(false);

            setResponse({ status: "success", message: data?.message });
            setTimeout(() => navigate("/dashboard/events/manage"), 2000);

        } catch (err) {
            setResponse({ status: "error", message: err?.message })
        } finally {
            setLoading(false);
        }
    }

    useEffect(function () {
        handleFetchEvent()
    }, [id])

    return (
        <>
            {loading && <Spinner />}

            {(response.status || response.message) && (
                <CustomAlert type={response.status} message={response.message} />
            )}

            <PageTop title="Details" prev="All Events" />

            {(id && showDeleteModal) && (
                <DeleteModal title="Event" close={() => setShowDeleteModal(false)} fn={handleDeleteEvent} />
            )}

            {(!loading && !error && event) && (
                <>
                    <EventPreview
                        setShowModal={setShowDeleteModal}
                        fetchedPreview={id ? true : false}
                        ////////////////////////////////
                        eventData={event}
                        cover_photo={`https://sub.passpro.africa/storage/${event?.gallery?.cover_photo}`}
                        event_image={`https://sub.passpro.africa/storage/${event?.gallery?.event_image}`}
                        customStyle={{ padding: width < 450 ? "2rem 1.2rem" : "2rem", borderRadius: ".4rem" }}
                    />
                </>
            )}
        </>
    )
}

export default index