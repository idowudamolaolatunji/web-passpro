import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import DataTable from 'react-data-table-component'
import { useFetchedContext } from '../../context/FetchedContext'
import Empty from '../../components/Empty';
import { BsCalendarEvent } from 'react-icons/bs';
import Tab from '../../components/Tab';
import { useWindowSize } from 'react-use';
import Spinner from '../../components/Spinner';
import SpinnerMini from '../../components/SpinnerMini';
import { formatDateTime } from '../../utils/helper';
import TableUI from '../../components/TableUI';


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
            selector: row => (
                <span className={`featured featured--${row?.featured ? "yes" : "no"}`}>
                    <p>{row?.featured ? "yes" : "no"}</p>
                </span>
            )
        },
        {
            name: "Event Date",
            selector: row => formatDateTime(row?.start_date, row?.start_date_time)
        },
        {
            name: "Actions",
            selector: row => (
                <div className='event-table-actions'>
                    <button>{row?.featured ? "featured" : "unfeatured"}</button>
                    <button>details</button>
                    <button>ticket</button>
                </div>
            ),
            width: "250px"
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

            <TableUI 
                data={data}
                columns={columns}
                loader={loader?.eventLoader}
                EmptyComponent={<Empty text={`No ${tab == "all" ? "" : tab} events yet`} icon={<BsCalendarEvent />} />}
            />
        </>
    )
}

export default index