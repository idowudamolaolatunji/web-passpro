import React, { useEffect } from 'react'
import PageTop from '../../components/PageTop'
import Empty from '../../components/Empty';
import { MdOutlineContactSupport } from 'react-icons/md';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';


function index() {
    const { supportTickets, error, loader, handleFetchSupportData } = useFetchedContext();

    const columns = [];

    useEffect(function() {
        document.title = "Passpro | Supports History"
        handleFetchSupportData()
    }, [])
    
    return (
        <>
            <PageTop title="All Support Tickets" />

            <TableUI
                data={supportTickets}
                columns={columns}
                EmptyComponent={<Empty text="No Support Ticket Yet" icon={<MdOutlineContactSupport />} />}
                loader={loader}
            />
        </>
    )
}

export default index