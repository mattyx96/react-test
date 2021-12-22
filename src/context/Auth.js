import React from 'react';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const initialAuth = {
    isAuth: false,
    user: {
        name: ""
    },
};

export const restoreAuth = () => {
    let auth = null;

    try {
        const storedData = window.localStorage.getItem('auth');

        if (storedData) {
            auth = JSON.parse(storedData);
        }
    } catch (err) {
        console.error(err);
        // If stored data is not a strigified JSON this will fail,
        // that's why we catch the error
    }

    return auth;
};

export const storeAuth = (auth) => {
    window.localStorage.setItem('auth', JSON.stringify(auth));
};

const AuthContext = createContext({
    auth: initialAuth,
    saveAuth: () => { }
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [auth, setAuth] = useState(initialAuth);

    useEffect(() => {
        const restoredAuth = restoreAuth();

        if (restoredAuth) {
            setAuth(restoredAuth);
        }
    }, []);

    const saveAuth = (updatedAuth) => {
        setAuth(updatedAuth);
        storeAuth(updatedAuth);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                saveAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;
