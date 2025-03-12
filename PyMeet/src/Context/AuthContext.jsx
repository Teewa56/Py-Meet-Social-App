import { createContext, useState, useEffect } from 'react';
import { login, logout, signUp, deleteAccount } from '../Services/api';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    AuthProvider.propTypes = {
            children: PropTypes.node.isRequired,
    };
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            const response = await login(data);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.access_token);
            setIsAuthenticated(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (data) => {
        setLoading(true);
        try {
            const response = await signUp(data);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.access_token);
            setIsAuthenticated(true);
            return { error: false };
        } catch (error) {
            setError(error.message || "Sign up failed");
            return { error: true };
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async(userId) => {
        setLoading(true);
        try{
            const res = await deleteAccount(userId);
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('theme');
            setIsAuthenticated(false);
            return res.data;
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleSignup, handleDelete, loading, isAuthenticated, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};