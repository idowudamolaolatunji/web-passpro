import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component'
import { useFetchedContext } from '../../context/FetchedContext'
import Empty from '../../components/Empty';
import { BsCalendarEvent } from 'react-icons/bs';
import Tab from '../../components/Tab';
import { useWindowSize } from 'react-use';
import Spinner from '../../components/Spinner';


function index() {
    const { width } = useWindowSize();
    const { events, loader, error, handleFetchEvents } = useFetchedContext();
    const [tab, setTab] = useState("all");

    const filteredEvents = events?.filter(event => event?.status == (tab));
    const data = tab == "all" ? events : filteredEvents;

    const columns = [
        {
            name: "Event Title",
            selector: row => row?.event_name
        },
        {
            name: "Event location",
            selector: row => row?.event_location
        },
        {
            name: "Featured",
            selector: row => row?.featured
        },
        {
            name: "Event Date",
            selector: row => row?.event_type
        },
        {
            name: "Actions",
            selector: row => { }
        }
    ];


    useEffect(function() {
        handleFetchEvents();
    }, []);

    return (
        <>  
            {loader?.event && <Spinner />}

            <PageTop title="All Events" />

            <div className="page__tabs">
                <Tab title={`All ${width > 400 ? "Events" : ""}`} active={tab == "all"} onClick={() => setTab("all")} />
                <Tab title="Pending" active={tab == "pending"} onClick={() => setTab("pending")} />
                <Tab title="Approved" active={tab == "approved"} onClick={() => setTab("approved")} />
                <Tab title="Rejected" active={tab == "rejected"} onClick={() => setTab("rejected")} />
            </div>

            <div className="table--container">
                <DataTable
                    data={data}
                    columns={columns}
                    noDataComponent={<Empty text={`No ${tab == "all" ? "" : tab} events yet`} icon={<BsCalendarEvent />} />}
                    fixedHeader
                />
            </div>
        </>
    )
}

export default index