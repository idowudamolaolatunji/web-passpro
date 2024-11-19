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
    const [searched, setSearched] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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

        const searchResult = withdrawalsHistory?.filter(data => data?.transaction_reference.includes(input) || data?.status.includes(input) || data?.amount.includes(+input))
        setSearchTerm(input);
        setSearched(searchResult)

        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }

    useEffect(function() {
        document.title = "Passpro | Withdrawal History"
        handleFetchWithdrawalsHistory()
    }, []);


    useEffect(function() {
        !input && setSearched(null)
    }, [input])


    return (
        <>
            {(showDetails && selectedData) && <DetailsModal data={selectedData} handleClose={handleToggle} />}

            <div className="table--top" style={{ alignItems: "flex-end" }}>
                <PageTop title="Withdrawal History" />

                <TableSearch title="Withdrawal History" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={searched ? searched : withdrawalsHistory}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                    <Empty text={`Check internet connection`} icon={<MdSignalWifiConnectedNoInternet0 />} />
                    :
                    <Empty text={`No ${searched ? "search result for: " + searchTerm : "Withdrawal Hsitory Yet"}`} icon={<BiMoneyWithdraw />} />
                }
            />

        </>
    )
}

export default index