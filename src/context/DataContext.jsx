import { createContext, useState, useEffect, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const DataContext = createContext();
export default DataContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////


export const DataProvider = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = function () {
        setShowMenu(!showMenu);
    }


    
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
