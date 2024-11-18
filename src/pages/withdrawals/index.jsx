import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import { BiMoneyWithdraw } from 'react-icons/bi';
import Empty from '../../components/Empty';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';
import DetailsModal from "./DetailsModal"
import TableSearch from '../../components/TableSearch';

function index() {
    const { withdrawalsHistory, error, loader, setLoader, handleFetchWithdrawalsHistory } = useFetchedContext();

    const [showDetails, setShowDetails] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [input, setInput] = useState("");


    const handleToggle = function(id) {
        setShowDetails(!showDetails);
        setSelectedId(id)
    }

    const columns = [
        {
            name: "Transaction ID",
            selector: row => {}
        },
        {
            name: "Gateway",
            selector: row => {}
        },
        {
            name: "Date Initiated",
            selector: row => {}
        },
        {
            name: "Amount Initiated",
            selector: row => {}
        },
        {
            name: "Amount Recieved",
            selector: row => {}
        },
        {
            name: "Status",
            selector: row => {}
        },
        {
            name: "Action",
            selector: row => {}
        },
    ];

    const handleSearch = function() {
        if(!input) return;
        setLoader(true)

        setLoader(false)
    }

    useEffect(function() {
        document.title = "Passpro | Withdrawal History"
        handleFetchWithdrawalsHistory()
    }, []);


    return (
        <>
            {(showDetails && selectedId) && <DetailsModal title="9156788004" handleClose={handleToggle} />}

            <PageTop title="Withdrawal History" />

            <div className="table--top">
                <div />

                <TableSearch title="Withdrawal History" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={withdrawalsHistory}
                columns={columns}
                loader={loader}
                EmptyComponent={<Empty text="No Withdrawal Hsitory Yet" icon={<BiMoneyWithdraw />} />}
            />

        </>
    )
}

export default index