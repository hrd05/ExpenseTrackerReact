
import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
    isLogin: false,
    token: '',
    login: (token) => { },
    logout: () => { },
    isProfileComplete: false,
    completeProfile: () => { }
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [token, setToken] = useState(initialToken);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const completeProfileHandler = () => {
        setIsProfileComplete(true);
    }


    const authContext = {
        isLogin: !!token,
        token: token,
        login: loginHandler,
        logout: logoutHandler,
        isProfileComplete: isProfileComplete,
        completeProfile: completeProfileHandler
    }

    return (
        <AuthContext.Provider value={authContext} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;