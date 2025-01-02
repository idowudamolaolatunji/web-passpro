import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop';
import TableSearch from '../../components/TableSearch';
import Tab from '../../components/Tab';
import { useLocation, useNavigate } from 'react-router-dom';
import TableUI from '../../components/TableUI';
import CouponForm from './couponTabs/CouponForm';
import AvailTable from './couponTabs/AvailTable';
import Empty from '../../components/Empty';
import { TbServerCog } from 'react-icons/tb';
import { MdSignalWifiConnectedNoInternet0 } from 'react-icons/md';
import { RiCoupon3Line } from 'react-icons/ri';
import { useFetchedContext } from '../../context/FetchedContext';


function index() {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParams = queryParams.get("tab")
    ///////////////////////////////////////

    const data = []
    const { loader, error } = useFetchedContext();
    
    const [tabShown, setTabShown] = useState("create");
    const [input, setInput] = useState("");
    const [searched, setSearched] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const columns = [
        {
            name: "Name",
            selector: row => {}
        },
        {
            name: "Code",
            selector: row => {},
        },
        {
            name: "Intiated",
            selector: row => {}
        },
        {
            name: "Discount Type",
            selector: row => {}
        },
        {
            name: "Event",
            selector: row => {}
        },
        {
            name: "Ticket",
            selector: row => {}
        },
        {
            name: "Quantity",
            selector: row => {}
        },
        {
            name: "Status",
            selector: row => (
                <span className={`status status--${row?.status}`}>
                    <p>{row?.status}</p>
                </span>
            )
        },
        {
            name: "Actions",
            selector: row => (
                <div className='event-table-actions'>
                    <button onClick={() => {}}>Details</button>
                </div>
            ),
        }
    ];

    const handleSearch = function () {
    }

    useEffect(function () {
        document.title = "Passpro | Coupons"
    }, []);

    // SET THE SHOWN TABS DIRECTLY FROM THE PARAMS ROUTE
    useEffect(function () {
        if (tabParams) {
            setTabShown(tabParams)
        } else {
            navigate("?tab=create")
        }
        // setSearch("")
    }, [tabParams]);

    return (
        <>
            <PageTop title="Coupons" />

            <div className="table--top" style={{ alignItems: "flex-start" }}>
                <div className="page__tabs">
                    <Tab title="Create Coupon Code" onClick={() => navigate("?tab=create")} active={tabShown == "create"} />
                    <Tab title="Coupon Available" onClick={() => navigate("?tab=available")} active={tabShown == "available"} />
                    <Tab title="Coupon History" onClick={() => navigate("?tab=history")} active={tabShown == "history"} />
                </div>

                {tabShown === "history" && <TableSearch title="Coupons" value={input} setValue={setInput} action={handleSearch} />}
            </div>


            {tabShown === "create" && <CouponForm />}
            {tabShown === "available" && <AvailTable />}
            {tabShown === "history" && (
                <TableUI
                    data={searched ? searched : data}
                    columns={columns}
                    loader={loader}
                    EmptyComponent={
                        error ? 
                            <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                        :
                            <Empty text={`No ${searched ? "search result for: " + searchTerm : "Coupon History"}`} icon={<RiCoupon3Line />} />
                    }
                />
            )}
            
        </>
    )
}

export default index