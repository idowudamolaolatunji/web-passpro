import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import Empty from '../../components/Empty';
import { MdOutlineContactSupport } from 'react-icons/md';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import TableSearch from '../../components/TableSearch';


function index() {
    const { supportTickets, error, loader, setLoader, handleFetchSupportData } = useFetchedContext();
    const [input, setInput] = useState("");

    const columns = [
        {
            name: "Subject",
            selector: row => {},
            width: "250px"
        },
        {
            name: "Status",
            selector: row => {}
        },
        {
            name: "Priority",
            selector: row => {}
        },
        {
            name: "Last reply",
            selector: row => {},
            width: "350px"
        },
        {
            name: "Action",
            selector: row => (
                <div className='table--actions'>
                    <button><FiEdit /></button>
                    <button><RiDeleteBinLine style={{ color: "red" }} /></button>
                </div>
            )
        },
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
            <PageTop title="All Tickets" />

            <div className="table--top">
                <div />

                <TableSearch title="Tickets" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={supportTickets}
                columns={columns}
                EmptyComponent={<Empty text="No Ticket Yet" icon={<MdOutlineContactSupport />} />}
                loader={loader}
            />
        </>
    )
}

export default index