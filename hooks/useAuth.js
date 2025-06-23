'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { login as apiLogin, register as apiRegister } from '@/lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing user session
        const token = Cookies.get('auth-token');
        const userData = Cookies.get('user-data');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
                logout();
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await apiLogin(email, password);

            if (response.success) {
                // Store user data and token
                Cookies.set('auth-token', response.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });
                Cookies.set('user-data', JSON.stringify(response.user), {
                    expires: 7,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });

                setUser(response.user);

                toast.success('Login successful!');

                // Redirect based on user role
                if (response.user.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/dashboard');
                }

                return { success: true };
            }
        } catch (error) {
            toast.error(error.message || 'Login failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await apiRegister(userData);

            if (response.success) {
                // Store user data and token
                Cookies.set('auth-token', response.token, {
                    expires: 7,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });
                Cookies.set('user-data', JSON.stringify(response.user), {
                    expires: 7,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                });

                setUser(response.user);

                toast.success('Registration successful!');
                router.push('/dashboard');

                return { success: true };
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // Clear cookies and user state
        Cookies.remove('auth-token');
        Cookies.remove('user-data');
        setUser(null);

        toast.success('Logged out successfully');
        // Don't redirect automatically - let components handle this
    };

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        Cookies.set('user-data', JSON.stringify(updatedUser), {
            expires: 7,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated,
        isAdmin,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
