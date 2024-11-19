import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import { BiMoneyWithdraw } from 'react-icons/bi';
import Empty from '../../components/Empty';
import TableUI from '../../components/TableUI';
import { useFetchedContext } from '../../context/FetchedContext';
import DetailsModal from "./DetailsModal"
import TableSearch from '../../components/TableSearch';
import { formatDateTime, formatNumber } from '../../utils/helper';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';

function index() {
    const { withdrawalsHistory, error, loader, setLoader, handleFetchWithdrawalsHistory } = useFetchedContext();

    const [showDetails, setShowDetails] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [input, setInput] = useState("");


    const handleToggle = function(data) {
        setShowDetails(!showDetails);
        setSelectedData(data)
    }

    const columns = [
        {
            name: "Transaction ID",
            selector: row => `#${row?.transaction_reference}`,
            width: "22rem"
        },
        {
            name: "Gateway",
            selector: () => "Bank Account"
        },
        {
            name: "Date Initiated",
            selector: row => formatDateTime(row?.initiated_at),
            width: "20rem"
        },
        {
            name: "Amount Initiated",
            selector: row => `₦${formatNumber(row?.amount)}`
        },
        {
            name: "Amount Recieved",
            selector: row => `₦${formatNumber(row?.net_amount)}`
        },
        {
            name: "Status",
            selector: row => (
                <div className={`status status--${row?.status}`}>
                    <p>{row?.status}</p>
                </div>
            )
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

        setLoader(false)
    }

    useEffect(function() {
        document.title = "Passpro | Withdrawal History"
        handleFetchWithdrawalsHistory()
    }, []);


    return (
        <>
            {(showDetails && selectedData) && <DetailsModal data={selectedData} handleClose={handleToggle} />}

            <PageTop title="Withdrawal History" />

            <div className="table--top">
                <div />

                <TableSearch title="Withdrawal History" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={withdrawalsHistory}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                    <Empty text={`Check internet connection`} icon={<MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text="No Withdrawal Hsitory Yet" icon={<BiMoneyWithdraw />} />
                }
            />

        </>
    )
}

export default index