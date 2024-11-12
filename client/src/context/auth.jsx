import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
        agentId: null,
    });

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            const agent = parsedData?.user; // Accessing 'user' as per localStorage structure

            setAuth({
                user: agent || null,                // Set the agent object as user
                token: agent?.token || "",          // Safely extract token from the agent
                agentId: agent?._id || null,        // Extract the agentId
            });

            // Set the default Authorization header for axios after setting auth
            axios.defaults.headers.common['Authorization'] = `Bearer ${agent?.token || ""}`;
        } else {
            // Clear the default header if there's no auth data
            delete axios.defaults.headers.common['Authorization'];
        }
    }, []);

    // Optional: Update axios header when auth state changes
    useEffect(() => {
        if (auth.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [auth.token]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };





