'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
    Car,
    Calendar,
    Clock,
    MapPin,
    CreditCard,
    User,
    Settings,
    Star,
    Plus,
    Eye,
    Download,
    Filter,
} from 'lucide-react';
import { getBookingsByCustomerId } from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils.js';
import { Button } from '@/components/ui/button';
import Loading from '@/components/layout/Loading';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        const fetchBookings = async () => {
            try {
                setLoading(true);
                const userBookings = await getBookingsByCustomerId(user.id);
                setBookings(userBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchBookings();
        }
    }, [user, isAuthenticated, router]);

    const filteredBookings = bookings.filter((booking) => {
        if (filterStatus === 'all') return true;
        return booking.status.toLowerCase() === filterStatus.toLowerCase();
    });

    const stats = {
        totalBookings: bookings.length,
        activeBookings: bookings.filter((b) => b.status === 'Active').length,
        completedBookings: bookings.filter((b) => b.status === 'Completed')
            .length,
        totalSpent: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'bookings', label: 'My Bookings', icon: Calendar },
        { id: 'profile', label: 'Profile', icon: Settings },
    ];

    if (loading) {
        return <Loading message="Loading your dashboard..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-gray-600">
                        Manage your bookings and account settings
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                            activeTab === tab.id
                                                ? 'border-primary-500 text-primary-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}>
                                        <Icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </motion.div>

                {/* Tab Content */}
                <div className="space-y-8">
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        title: 'Total Bookings',
                                        value: stats.totalBookings,
                                        icon: Calendar,
                                        color: 'bg-blue-500',
                                    },
                                    {
                                        title: 'Active Rentals',
                                        value: stats.activeBookings,
                                        icon: Car,
                                        color: 'bg-green-500',
                                    },
                                    {
                                        title: 'Completed',
                                        value: stats.completedBookings,
                                        icon: Star,
                                        color: 'bg-purple-500',
                                    },
                                    {
                                        title: 'Total Spent',
                                        value: formatCurrency(stats.totalSpent),
                                        icon: CreditCard,
                                        color: 'bg-orange-500',
                                    },
                                ].map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={stat.title}
                                            className="bg-white rounded-xl shadow-lg p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">
                                                        {stat.title}
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`${stat.color} p-3 rounded-lg`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Recent Bookings */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Recent Bookings
                                    </h2>
                                    <Button
                                        onClick={() => setActiveTab('bookings')}
                                        variant="outline"
                                        size="sm">
                                        View All
                                    </Button>
                                </div>

                                {bookings.length > 0 ? (
                                    <div className="space-y-4">
                                        {bookings.slice(0, 3).map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={
                                                            booking.car
                                                                ?.images?.[0] ||
                                                            '/placeholder-car.jpg'
                                                        }
                                                        alt={booking.car?.name}
                                                        className="w-16 h-12 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {booking.car?.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {formatDate(
                                                                booking.startDate,
                                                            )}{' '}
                                                            -{' '}
                                                            {formatDate(
                                                                booking.endDate,
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                            booking.status,
                                                        )}`}>
                                                        {booking.status}
                                                    </span>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {formatCurrency(
                                                            booking.totalPrice,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            No bookings yet
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Start exploring our amazing fleet of
                                            vehicles
                                        </p>
                                        <Button
                                            onClick={() =>
                                                router.push('/cars')
                                            }>
                                            Browse Cars
                                        </Button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Quick Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    Quick Actions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button
                                        onClick={() => router.push('/cars')}
                                        className="flex items-center justify-center space-x-2 p-4 h-auto">
                                        <Plus className="w-5 h-5" />
                                        <span>Book New Car</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setActiveTab('bookings')}
                                        className="flex items-center justify-center space-x-2 p-4 h-auto">
                                        <Eye className="w-5 h-5" />
                                        <span>View Bookings</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setActiveTab('profile')}
                                        className="flex items-center justify-center space-x-2 p-4 h-auto">
                                        <Settings className="w-5 h-5" />
                                        <span>Account Settings</span>
                                    </Button>
                                </div>
                            </motion.div>
                        </>
                    )}

                    {activeTab === 'bookings' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    My Bookings
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) =>
                                            setFilterStatus(e.target.value)
                                        }
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">
                                            Confirmed
                                        </option>
                                        <option value="active">Active</option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {filteredBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredBookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="border border-gray-200 rounded-lg p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={
                                                            booking.car
                                                                ?.images?.[0] ||
                                                            '/placeholder-car.jpg'
                                                        }
                                                        alt={booking.car?.name}
                                                        className="w-20 h-16 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {booking.car?.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {booking.car?.brand}{' '}
                                                            {booking.car?.model}
                                                        </p>
                                                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                                            <div className="flex items-center space-x-1">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>
                                                                    {formatDate(
                                                                        booking.startDate,
                                                                    )}{' '}
                                                                    -{' '}
                                                                    {formatDate(
                                                                        booking.endDate,
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <MapPin className="w-4 h-4" />
                                                                <span>
                                                                    {
                                                                        booking.pickupLocation
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                                booking.status,
                                                            )}`}>
                                                            {booking.status}
                                                        </span>
                                                        <p className="text-lg font-semibold text-gray-900 mt-1">
                                                            {formatCurrency(
                                                                booking.totalPrice,
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {booking.totalDays}{' '}
                                                            day
                                                            {booking.totalDays >
                                                            1
                                                                ? 's'
                                                                : ''}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col space-y-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline">
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            View Details
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline">
                                                            <Download className="w-4 h-4 mr-1" />
                                                            Receipt
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No bookings found
                                    </h3>
                                    <p className="text-gray-600">
                                        Try adjusting your filter or book a new
                                        car
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Profile Settings
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-6">
                                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {user?.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {user?.email}
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="mt-2">
                                            Change Photo
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Save Changes</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
