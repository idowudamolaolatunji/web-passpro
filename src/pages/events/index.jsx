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
import TableSearch from '../../components/TableSearch';


function index() {
    const { width } = useWindowSize();
    const { events, loader, setLoader, error, handleFetchEvents } = useFetchedContext();
    const [tab, setTab] = useState("all");
    const [input, setInput] = useState("");

    const filteredEvents = events?.filter(event => event?.status == (tab));
    let data = tab == "all" ? events : filteredEvents;

    const columns = [
        {
            name: "Event Title",
            selector: row => row?.event_name
        },
        {
            name: "Event location",
            selector: row => row?.event_location,
            width: "25rem"
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
            width: "25rem"
        }
    ];


    const handleSearch = function() {
        if(!input) return;
        setLoader(true)

        setLoader(false)
    }


    useEffect(function() {
        handleFetchEvents();
    }, []);

    return (
        <>  
            <PageTop title="All Events" />

            <div className="table--top">
                <div className="page__tabs">
                    <Tab title={`All ${width > 400 ? "Events" : ""}`} active={tab == "all"} onClick={() => setTab("all")} />
                    <Tab title="Pending" active={tab == "pending"} onClick={() => setTab("pending")} />
                    <Tab title="Approved" active={tab == "approved"} onClick={() => setTab("approved")} />
                    <Tab title="Rejected" active={tab == "rejected"} onClick={() => setTab("rejected")} />
                </div>

                <TableSearch title="Events" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI 
                data={data}
                columns={columns}
                loader={loader}
                EmptyComponent={<Empty text={`No ${tab == "all" ? "" : tab} events yet`} icon={<BsCalendarEvent />} />}
            />
        </>
    )
}

export default index