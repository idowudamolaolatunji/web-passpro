import React, { useEffect, useState } from 'react';

import logo from '../../assets/logo/logo-img.png';
import user_img from '../../assets/png/Ellipse 155.png'
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import { useWindowSize } from 'react-use';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDataContext } from '../../context/DataContext';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Dropdown from '../../components/Dropdown';
import ProfileImage from '../../components/ProfileImage';
import CustomAlert from '../../components/CustomAlert';
import Spinner from '../../components/Spinner';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useAuthContext } from '../../context/AuthContext';

function DashboardHead() {
    const { width } = useWindowSize();
    const { headers } = useAuthContext();
    const { handleToggleMenu } = useDataContext();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState([])

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ status: "", message: "" });

    const ref = useOutsideClick(handleClose);

    function handleClose() {
        setShowSearchBar(false);
    }

    useEffect(function () {
		const handleFetchSearchQuery = setTimeout(async function () {
			try {
				// if (searchQuery.trim() === '' || !setSearchQuery) {
				// 	setShowSearchModal(false)
				// 	setResults({});
				// 	return;
				// }

				// setLoading(true);
				// setShowSearchModal(true);

				const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/search?query=${searchQuery}`, { method: 'GET', headers });


				const data = await res.json();
				console.log(data);

			} catch (err) {
				// if (err.name !== "AbortError") {
				// 	setMessage(err.message)
				// 	setShowSearchModal(false)
				// }
			} finally {
				setLoading(false);
			}
		}, 350)

		return function () {
			clearTimeout(handleFetchSearchQuery)
		};

	}, [searchQuery]);

    return (
        <>
            {loading && <Spinner />}
            {(response.status || response.message) && <CustomAlert type={response.status} message={response.message} />}

            <header className='dashboard--header'>
                {width <= 900 && (
                    <div className="header--main">
                        <span className='header--hamburger' onClick={handleToggleMenu}>
                            <RxHamburgerMenu />
                        </span>

                        <div className="header--logo">
                            <img src={logo} alt='Logo image' />
                        </div>
                    </div>
                )}

                <div className="header--search">
                    <input type="text" className='form--input' placeholder='Search Events, Tickets and Occassions' value={searchQuery} onChange={(e) => setSearchQuery(e?.target?.value)} />
                    <BiSearch />
                </div>

                <div className="header--others">
                    {showSearchBar && (
                        <div className="header--search" ref={ref}>
                            <input type="text" className='form--input' placeholder='Search Events, Tickets and Occassions' value={searchQuery} onChange={(e) => setSearchQuery(e?.target?.value)} />
                            <BiSearch />
                        </div>
                    )}

                    {width < 750 && (
                        <span className='header--icon' onClick={() => setShowSearchBar(true)}>
                            <BiSearch />
                        </span>
                    )}


                    {/* FOR THE NEXT MILESTONE */}
                    {/* <span className='header--icon'>
                        <BsBell />
                    </span> */}

                    <div className="user--profile" onClick={() => setShowDropdown(!showDropdown)}>
                        <ProfileImage />
                        <BiChevronDown />

                        {showDropdown && <Dropdown setShow={setShowDropdown} setLoading={setLoading} setResponse={setResponse} />}
                    </div>
                </div>
            </header>

        </>

    )
}

export default DashboardHead