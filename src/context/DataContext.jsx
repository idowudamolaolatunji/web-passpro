import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-use";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const DataContext = createContext();
export default DataContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////


export const DataProvider = ({ children }) => {
    const { pathname } = useLocation();

    const [closeAnimate, setCloseAnimate] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = function () {
        setShowMenu(!showMenu);
    }

    function closeNanimate() {
        setCloseAnimate(true);
        setTimeout(() => {
            setCloseAnimate(false);
            setShowMenu(false);
        }, 300);
    }


    useEffect(function() {
        closeNanimate();
    }, [pathname]);


    
    // CREATE CONTEXT DATA
    let contextData = {
        showMenu,
        closeAnimate,
        handleToggleMenu,
    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);
