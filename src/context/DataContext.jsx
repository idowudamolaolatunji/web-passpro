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
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = function () {
        setShowMenu(!showMenu);
    }


    useEffect(function() {
        setShowMenu(false);
    }, [pathname]);


    
    // CREATE CONTEXT DATA
    let contextData = {
        showMenu,
        handleToggleMenu,
    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);
