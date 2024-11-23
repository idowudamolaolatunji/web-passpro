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
import { Link } from 'react-router-dom';
import SearchModal from '../../components/SearchModal';

function DashboardHead() {
    const { width } = useWindowSize();
    const { headers } = useAuthContext();
    const { handleToggleMenu } = useDataContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ status: "", message: "" });

    ////////////////////////////////////////////////////////////
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchMessage, setSearchMessage] = useState(false);
    ////////////////////////////////////////////////////////////

    const ref = useOutsideClick(handleClose);

    function handleClose() {
        setShowSearchBar(false);
    }

    useEffect(function () {
		const handleFetchSearchQuery = setTimeout(async function () {
            if (searchQuery.trim() === '' || !setSearchQuery) {
                setSearchResults(null);
                setShowSearchModal(false)
                return;
            }
            
			try {
				setSearchLoader(true);
				setShowSearchModal(true);

				const res = await fetch(`${import.meta.env.VITE_BASE_URL_V1}/search?query=${searchQuery}`, { method: 'GET', headers });

				const data = await res.json();
				console.log(data);
                if(!data?.success && res.status != 200) {
                    throw new Error(data?.message || data?.error);
                }

                setSearchMessage(data?.message);
                setSearchResults(data?.data);

			} catch (err) {
				if (err?.name !== "AbortError") {
					setResponse({ status: "error", message: err?.message })
					setShowSearchModal(false)
				}
			} finally {
				setSearchLoader(false);
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

                        <Link to="/" className="header--logo">
                            <img src={logo} alt='Logo image' />
                        </Link>
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

                        {showDropdown && 
                            <Dropdown 
                                setShow={setShowDropdown}
                                setLoading={setLoading}
                                setResponse={setResponse}
                            />
                        }
                    </div>
                </div>


                {showSearchModal && (
                    <SearchModal
                        results={searchResults}
                        loader={searchLoader}
                        message={searchMessage}
                        setShow={setShowSearchModal}
                    />
                )}
            </header>

        </>

    )
}

export default DashboardHead