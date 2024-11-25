import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import Empty from '../../components/Empty';
import { MdOutlineContactSupport, MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';
import TableSearch from '../../components/TableSearch';
import { TbServerCog } from 'react-icons/tb';
import DetailsModal from "./DetailsModal";


function index() {
    const { supportTickets, error, loader, setLoader, handleFetchSupportData } = useFetchedContext();
    
    const [showDetails, setShowDetails] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [input, setInput] = useState("");
    const [searched, setSearched] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleToggle = function(data) {
        setShowDetails(!showDetails);
        setSelectedData(data)
    }

    const columns = [
        {
            name: "Subject",
            selector: row => row?.subject,
            width: "25rem"
        },
        {
            name: "Status",
            selector: row => (
                <p className={`text--status text--${row?.status}`}>{row?.status}</p>
            )
        },
        {
            name: "Priority",
            selector: row => row?.priority
        },
        {
            name: "Last reply",
            selector: row => (
                <div style={{ width: "100%", wordBreak: "break-word" }}>
                    <p>{row?.last_message}</p>
                </div>
            ),
            width: "35rem"
        },
        {
            name: "Action",
            selector: row => (
                <button className='table--view-btn' onClick={() => handleToggle(row)}>View Details</button>
            )
        },
    ];


    const handleSearch = function() {
        if(!input) return;
        setLoader(true)

        const value = input?.toLowerCase()

        const searchResult = supportTickets?.filter(data => data?.subject?.toLowerCase()?.includes(value) || data?.status?.toLowerCase()?.includes(value) || data?.priority?.toLowerCase()?.includes(value));

        setSearchTerm(input);
        setSearched(searchResult)

        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }

    useEffect(function() {
        document.title = "Passpro | Ticket History"
        handleFetchSupportData();
    }, []);
    

    return (
        <>
            {(showDetails && selectedData) && <DetailsModal data={selectedData} handleClose={handleToggle} />}

            <div className="table--top" style={{ alignItems: "flex-end" }}>
                <PageTop title="All Tickets" />

                <TableSearch title="Tickets" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={searched ? searched : supportTickets}
                columns={columns}
                EmptyComponent={
                    error ? 
                    <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No ${searched ? "search result for: " + searchTerm : "Ticket Yet"}`} icon={<MdOutlineContactSupport />} />
                }
                loader={loader}
            />
        </>
    )
}

export default index