
import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
    isLogin: false,
    token: '',
    login: (token) => { },
    logout: () => { },
    isProfileComplete: false,
    completeProfile: () => { },
    isVerified: false,
    verify: () => { }
})

export const AuthContextProvider = (props) => {
    const emailVerified = localStorage.getItem('isVerified');
    const profileComplete = localStorage.getItem('isProfileComplete');
    const initialToken = localStorage.getItem('token');
    const [isProfileComplete, setIsProfileComplete] = useState(profileComplete);
    const [token, setToken] = useState(initialToken);
    const [isVerified, setVerified] = useState(emailVerified);

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
        localStorage.setItem('isVerified', true);
    }

    const verifyHandler = () => {
        setVerified(true);
        localStorage.setItem('isProfileComplete', true);
    }

    const authContext = {
        isLogin: !!token,
        token: token,
        login: loginHandler,
        logout: logoutHandler,
        isProfileComplete: isProfileComplete,
        completeProfile: completeProfileHandler,
        isVerified: isVerified,
        verify: verifyHandler
    }

    return (
        <AuthContext.Provider value={authContext} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;