import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const UserAuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState({
        user: null,
        token: "",
    });
    const [loading, setLoading] = useState(true); // New state to handle loading

    useEffect(() => {
        const data = localStorage.getItem('userAuth');
        if (data) {
            const parsedData = JSON.parse(data);

            setUserAuth({
                user: parsedData?.user || null,
                token: parsedData?.token || "",
            });

            if (parsedData?.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${parsedData.token}`;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false); // Set loading to false after setting auth state
    }, []);

    useEffect(() => {
        if (userAuth?.user && userAuth?.token) {
            localStorage.setItem('userAuth', JSON.stringify(userAuth));
            axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth.token}`;
        } else {
            localStorage.removeItem('userAuth');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [userAuth]);

    return (
        <AuthContext.Provider value={[userAuth, setUserAuth, loading]}>
            {children}
        </AuthContext.Provider>
    );
};

const useUserAuth = () => useContext(AuthContext);

export { useUserAuth, UserAuthProvider };
