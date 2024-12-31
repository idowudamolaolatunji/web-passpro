import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop'
import TableSearch from '../../components/TableSearch'
import Tab from '../../components/Tab';
import { useLocation, useNavigate } from 'react-router-dom';

function index() {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParams = queryParams.get("tab")
    ///////////////////////////////////////

    const [tabShown, setTabShown] = useState("all");
    const [input, setInput] = useState("");
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
        // setSearch("")
    }, [tabParams]);

    return (
        <>
            <PageTop title="Transaction" />

            <div className="table--top">
                <div className="page__tabs">
                    <Tab title="All Transactions" onClick={() => navigate("?tab=all")} active={tabShown == "all"} />
                    <Tab title="Ticket Orders" onClick={() => navigate("?tab=ticket-orders")} active={tabShown == "ticket-orders"} />
                    <Tab title="Withdrawals" onClick={() => navigate("?tab=withdrawals")} active={tabShown == "withdrawals"} />
                    {/* <Tab title="Refunds" onClick={navigate("?tab=refund")} active={tabShown == "refund"} /> */}
                </div>

                <TableSearch title="Transaction" value={input} setValue={setInput} action={handleSearch} />
            </div>

            <p>Coming...</p>
        </>
    )
}

export default index