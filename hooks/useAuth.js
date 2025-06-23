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
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const initializeAuth = () => {
            try {
                // check for existing user session
                const token = Cookies.get('auth-token');
                const userData = Cookies.get('user-data');

                console.log('Token:', token);
                console.log('User data:', userData);

                if (token && userData) {
                    try {
                        const parsedUser = JSON.parse(
                            decodeURIComponent(userData),
                        );
                        console.log('Parsed user:', parsedUser);
                        setUser(parsedUser);
                    } catch (error) {
                        console.error('Error parsing user data:', error);
                        // clear invalid cookies
                        Cookies.remove('auth-token', { path: '/' });
                        Cookies.remove('user-data', { path: '/' });
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        // add a small delay to ensure cookies are available
        const timer = setTimeout(initializeAuth, 100);
        return () => clearTimeout(timer);
    }, [mounted]);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await apiLogin(email, password);

            if (response.success) {
                Cookies.remove('auth-token', { path: '/' });
                Cookies.remove('user-data', { path: '/' });

                Cookies.set('auth-token', response.token, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                });

                const userDataString = JSON.stringify(response.user);
                Cookies.set('user-data', userDataString, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                });

                setUser(response.user);
                toast.success('Login successful!');

                // Use a small delay before redirect to ensure state is updated
                setTimeout(() => {
                    if (response.user.role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/dashboard');
                    }
                }, 100);

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
                Cookies.remove('auth-token', { path: '/' });
                Cookies.remove('user-data', { path: '/' });

                Cookies.set('auth-token', response.token, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                });

                const userDataString = JSON.stringify(response.user);
                Cookies.set('user-data', userDataString, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                });

                setUser(response.user);
                toast.success('Registration successful!');

                setTimeout(() => {
                    router.push('/dashboard');
                }, 100);

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
        Cookies.remove('auth-token', { path: '/' });
        Cookies.remove('user-data', { path: '/' });
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/login');
    };

    const updateUser = (userData) => {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        const userDataString = JSON.stringify(updatedUser);
        Cookies.set('user-data', userDataString, {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
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
        mounted,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
