import { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const AuthContext = createContext();
export default AuthContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(Cookies.get('user_obj') ? JSON.parse(Cookies.get('user_obj')) : null);
    const [token, setToken] = useState(Cookies.get('user_jwt_token') ? Cookies.get('user_jwt_token') : null);

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }

    function handleChange(user, token) {
        setUser(user);
        setToken(token);
    };

    function handleUser(user) {
        setUser(user);
    };


    async function logoutUser() {
        await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
            method: "POST", headers
        });

        setTimeout(function() {
            handleChange(null, null);
            Cookies.remove("user_obj");
            Cookies.remove("user_jwt_token");
        }, 2000);

        return true
    }

    function shouldKick(e) {
        if (e.response.status === 401 || e.response.status === 403) {
            Cookies.remove("user_obj");
            Cookies.remove("user_jwt_token");
            window.location.href = "/login";
        }
    };


    useEffect(function () {
        Cookies.set("user_obj", JSON.stringify(user), { expires: 365 });
        Cookies.set("user_jwt_token", token, { expires: 365 });
    }, [user, token]);

    // CREATE CONTEXT DATA
    let contextData = {
        user,
        token,
        headers,
        handleChange,
        handleUser,
        logoutUser,
        shouldKick,
    }


    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useAuthContext = () => useContext(AuthContext);