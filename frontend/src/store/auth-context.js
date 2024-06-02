
import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
    isLogin: false,
    token: '',
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }


    const authContext = {
        isLogin: !!token,
        token: token,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={authContext} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;