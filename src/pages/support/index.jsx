import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import Empty from '../../components/Empty';
import { MdOutlineContactSupport, MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import TableSearch from '../../components/TableSearch';
import { TbServerCog } from 'react-icons/tb';


function index() {
    const { supportTickets, error, loader, setLoader, handleFetchSupportData } = useFetchedContext();
    const [input, setInput] = useState("");

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
        // {
        //     name: "Action",
        //     selector: row => (
        //         <div className='table--actions'>
        //             <button><FiEdit /></button>
        //             <button><RiDeleteBinLine style={{ color: "red" }} /></button>
        //         </div>
        //     )
        // },
    ];


    const handleSearch = function() {
        if(!input) return;
        setLoader(true)

        setLoader(false)
    }

    useEffect(function() {
        document.title = "Passpro | Ticket History"
        handleFetchSupportData();
    }, []);
    

    return (
        <>
            <div className="table--top" style={{ alignItems: "flex-end" }}>
                <PageTop title="All Tickets" />

                <TableSearch title="Tickets" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={supportTickets}
                columns={columns}
                EmptyComponent={
                    error ? 
                    <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text="No Ticket Yet" icon={<MdOutlineContactSupport />} />
                }
                loader={loader}
            />
        </>
    )
}

export default index