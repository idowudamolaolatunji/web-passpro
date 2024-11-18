import React, { useState } from 'react'
import MenuItem from './MenuItem'
import Overlay from '../../components/Overlay'
import logo from '../../assets/logo/logo-img-white.png';

import { transfer, withdrawal, signout, support_ticket, home, right_arrow, calender } from "../../assets/svg";
import { useDataContext } from '../../context/DataContext';
import { IoCloseSharp } from 'react-icons/io5';
import { event_sub, support_sub, withdrawal_sub } from "../../utils/data";
import Spinner from '../../components/Spinner';
import CustomAlert from '../../components/CustomAlert';
import { useAuthContext } from '../../context/AuthContext';


function DashboardMenu() {
    const { logoutUser } = useAuthContext();
    const { showMenu, closeAnimate, handleToggleMenu } = useDataContext();

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ status: "", message: "" });
    
    async function handleLogout() {
        // LOGOUT LOGIC
        setLoading(true);
    
        const result = await logoutUser();
        setLoading(true);
        if (!result) return setResponse({ status: "error", message: "Error logging out!" })
        setResponse({ status: "success", message: "Logout successful!" });
      }

    return (
        <>
            {loading && <Spinner />}
            {(response.status || response.message) && <CustomAlert type={response.status} message={response.message} />}



            <div className="dashboard--menu">
                <div className="header--logo" style={{ width: "14.8rem"}}>
                    <img src={logo} alt='Logo image' />
                </div>

                <ul className='menu--list'>
                    <MenuItem icon={home} text="Dashboard" link="/" />
                    <MenuItem icon={calender} text="Events" link="/events" arrow isBtn sub={event_sub} />
                    <MenuItem icon={withdrawal} text="Withdrawals" link="/withdrawals" arrow isBtn sub={withdrawal_sub} />
                    {/* <MenuItem icon={transfer} text="Transactions" link="/transactions" arrow isBtn /> */}
                    <MenuItem icon={support_ticket} text="Support Tickets" link="/support-tickets" arrow isBtn sub={support_sub} />
                    <MenuItem icon={signout} text="Logout" isBtn action={handleLogout}  />
                </ul>
            </div>




            {showMenu && (
                <>
                    <Overlay handleClose={handleToggleMenu} />
                    <div className={`dashboard--sidemenu ${closeAnimate ? 'animate-out' : ''}`}>
                        <div className="header--logo" style={{ width: "14.8rem"}}>
                            <img src={logo} alt='Logo image' />
                        </div>

                        <div className="sidemenu--hamburger" onClick={handleToggleMenu}>
                            <IoCloseSharp />
                        </div>
                        <ul className='menu--list'>
                            <MenuItem icon={home} text="Dashboard" link="/" />
                            <MenuItem icon={calender} text="Events" link="/events" arrow isBtn sub={event_sub} />
                            <MenuItem icon={withdrawal} text="Withdrawals" link="/withdrawals" arrow isBtn sub={withdrawal_sub} />
                            {/* <MenuItem icon={transfer} text="Transactions" link="/transactions" arrow isBtn /> */}
                            <MenuItem icon={support_ticket} text="Support Tickets" link="/support-tickets" arrow isBtn sub={support_sub} />
                            <MenuItem icon={signout} text="Logout" isBtn action={handleLogout} />
                        </ul>
                    </div>
                </>
            )}
        </>



    )
}

export default DashboardMenu