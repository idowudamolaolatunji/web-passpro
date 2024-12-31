import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import { useFetchedContext } from '../../context/FetchedContext'
import Empty from '../../components/Empty';
import { BsCalendarEvent } from 'react-icons/bs';
import Tab from '../../components/Tab';
import { useWindowSize } from 'react-use';
import { formatDateTime } from '../../utils/helper';
import TableUI from '../../components/TableUI';
import TableSearch from '../../components/TableSearch';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import PreviewTicket from '../../components/PreviewTicket';
import { TbServerCog } from 'react-icons/tb';


function index() {
    const { width } = useWindowSize();
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParams = queryParams.get("tab")
    ///////////////////////////////////////

    const { events, loader, setLoader, error, handleFetchEvents, handleToggleFeaturedEvent } = useFetchedContext();
    const [tabShown, setTabShown] = useState("all");
    const [input, setInput] = useState("");
    const [searched, setSearched] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const data = tabShown == "all" ? events : events?.filter(event => event?.status == (tabShown));

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
                    <button onClick={() => handleToggleFeaturedEvent(row?.id)}>{row?.featured ? "unfeature" : "feature"}</button>
                    <button onClick={() => navigate(`/dashboard/events/manage/${row?.id}`)}>details</button>
                    <button onClick={() => handleShowModal(row)}>ticket</button>
                </div>
            ),
            width: "25rem"
        }
    ];

    const handleShowModal = function(data) {
        setSelected(data);
        setShowModal(!showModal)
    }

    const handleSearch = function() {
        if(!input) return;
        setLoader(true)

        const searchResult = data?.filter(data => data?.event_name?.includes(input) || data?.status?.includes(input) || data?.event_description?.includes(input) || data?.event_location?.includes(input));
        setSearchTerm(input);
        setSearched(searchResult)

        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }


    useEffect(function() {
        document.title = "Passpro | Manage Events"

        handleFetchEvents();
    }, []);

    // SET THE SHOWN TABS DIRECTLY FROM THE PARAMS ROUTE
    useEffect(function () {
        if (tabParams) {
            setTabShown(tabParams)
        } else {
            navigate("?tab=all")
        }
        // setSearch("")
    }, [tabParams]);


    useEffect(function() {
        !input && setSearched(null)
    }, [input]);

    return (
        <>  
            {(showModal && selected) && (
                <Modal className="mini" handleClose={() => setShowModal(false)}>
                    <div className="modal--head">
                        <h3>{selected?.event_name}'s Tickets</h3>
                        <span onClick={() => setShowModal(false)}>
                            <AiOutlineClose />
                        </span>
                    </div>

                    <div className='preview--tickets'>
                        {selected?.tickets?.map(ticket => (
                            <PreviewTicket data={ticket} key={ticket?.ticket_name} />
                        ))}
                    </div>
                </Modal>
            )}

            <PageTop title="All Events" />

            <div className="table--top">
                <div className="page__tabs">
                    <Tab title={`All ${width > 400 ? "Events" : ""}`} onClick={() => navigate("?tab=all")} active={tabShown == "all"} />
                    <Tab title="Pending" onClick={() => navigate("?tab=pending")} active={tabShown == "pending"} />
                    <Tab title="Approved" onClick={() => navigate("?tab=approved")} active={tabShown == "approved"} />
                    <Tab title="Rejected" onClick={() => navigate("?tab=rejected")} active={tabShown == "rejected"} />
                </div>

                <TableSearch title="Events" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI 
                data={searched ? searched : data}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                    <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No ${searched ? "search result for: " + searchTerm : tabShown == "all" ? "" : tabShown + " events"}`} icon={<BsCalendarEvent />} />
                }
            />
        </>
    )
}

export default index