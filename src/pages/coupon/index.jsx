import React, { useEffect, useState } from 'react'
import PageTop from '../../components/PageTop';
import TableSearch from '../../components/TableSearch';
import Tab from '../../components/Tab';
import { useLocation, useNavigate } from 'react-router-dom';
import TableUI from '../../components/TableUI';
import CouponForm from './couponTabs/CouponForm';
import AvailTable from './couponTabs/AvailTable';


function index() {
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParams = queryParams.get("tab")
    ///////////////////////////////////////

    const [tabShown, setTabShown] = useState("create");
    const [input, setInput] = useState("");
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
                <>
                    <p>Coming...</p>
                    {/* <TableUI
                        data={searched ? searched : data}
                        columns={columns}
                        loader={loader}
                        EmptyComponent={
                            error ? 
                            <Empty text={error} icon={error?.startsWith("Server") ? <TbServerCog /> : <MdSignalWifiConnectedNoInternet0 />} />
                            :
                            <Empty text={`No ${searched ? "search result for: " + searchTerm : tabShown == "all" ? "" : tabShown + " events"}`} icon={<BsCalendarEvent />} />
                        }
                    /> */}
                </>
            )}
            
        </>
    )
}

export default index