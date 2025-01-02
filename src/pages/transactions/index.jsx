import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import TableSearch from '../../components/TableSearch'
import Tab from '../../components/Tab';
import { useLocation, useNavigate } from 'react-router-dom';
import TableUI from '../../components/TableUI';
import Empty from '../../components/Empty';
import { TbServerCog } from 'react-icons/tb';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { useFetchedContext } from '../../context/FetchedContext';
import { GrTransaction } from 'react-icons/gr';

function index() {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParams = queryParams.get("tab")
    ///////////////////////////////////////
    const transactions = []
    const { loader, error } = useFetchedContext();

    const [tabShown, setTabShown] = useState("all");
    const [input, setInput] = useState("");

    const [searched, setSearched] = useState("");
    const [searchTerm, setSearchTerm] = useState("");


    const data = tabShown == "all" ? transactions : transactions?.filter(trnx => trnx?.type == (tabShown));

    const columns = [
        {
            name: "Transaction ID",
            selector: row => {}
        },
        {
            name: "Description",
            selector: row => {},
            width: "25rem"
        },
        {
            name: "Amount",
            selector: row => {}
        },
        {
            name: "Previous Bal.",
            selector: row => {}
        },
        {
            name: "New Bal.",
            selector: row => {}
        },
        {
            name: "Trnx Date",
            selector: row => {}
        },
        {
            name: "Actions",
            selector: row => (
                <div className='event-table-actions'>
                    <button onClick={() => {}}>Details</button>
                    <button onClick={() => {}}>Ticket</button>
                </div>
            ),
            width: "25rem"
        }
    ];


    const handleSearch = function () {
    }


    useEffect(function () {
        document.title = "Passpro | Transaction History"
    }, []);


    // SET THE SHOWN TABS DIRECTLY FROM THE PARAMS ROUTE
    useEffect(function () {
        if (tabParams) {
            setTabShown(tabParams)
        } else {
            navigate("?tab=all")
        }
        // setSearched(null)
    }, [tabParams]);

    useEffect(function() {
        !input && setSearched(null)
    }, [input]);

    return (
        <>
            <PageTop title="Transaction" />

            <div className="table--top">
                <div className="page__tabs">
                    <Tab title="All Transactions" onClick={() => navigate("?tab=all")} active={tabShown == "all"} />
                    <Tab title="Ticket Orders" onClick={() => navigate("?tab=ticket-orders")} active={tabShown == "ticket-orders"} />
                    <Tab title="Withdrawals" onClick={() => navigate("?tab=withdrawals")} active={tabShown == "withdrawals"} />
                </div>

                <TableSearch title="Transaction" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <TableUI
                data={searched ? searched : data}
                columns={columns}
                loader={loader}
                EmptyComponent={
                    error ? 
                        <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                    :
                        <Empty text={`No ${searched ? "search result for: " + searchTerm : tabShown == "all" ? "" : tabShown}`} icon={<GrTransaction />} />
                }
            />
        </>
    )
}

export default index