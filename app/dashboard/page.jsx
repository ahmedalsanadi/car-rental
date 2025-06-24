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
    const { user, isAuthenticated, loading: authLoading, mounted } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        // Wait for auth to be mounted and loaded
        if (!mounted || authLoading) return;

        // Check authentication after auth has loaded
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
    }, [mounted, authLoading, user, isAuthenticated, router]);

    // show loading while auth is initializing
    if (!mounted || authLoading) {
        return <Loading message="Initializing..." />;
    }

    // show loading while data is being fetched
    if (loading) {
        return <Loading message="Loading your dashboard..." />;
    }

    // if not authenticated, don't render anything
    // (redirect will happen in useEffect)
    if (!isAuthenticated()) {
        return null;
    }

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
                        <nav className="flex overflow-x-auto px-1 md:px-4 scrollbar-hide">
                            <div className="flex space-x-1 md:space-x-8 min-w-max">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs md:text-sm flex items-center space-x-2 whitespace-nowrap ${
                                                activeTab === tab.id
                                                    ? 'border-primary-500 text-primary-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}>
                                            <Icon className="w-3 h-3 md:w-4 md:h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
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
                                className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                                            className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 md:rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                                                        {stat.title}
                                                    </p>
                                                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`${stat.color} p-2 sm:p-3 rounded-md md:rounded-lg`}>
                                                    <Icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Recent Bookings - Mobile optimized */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-lg shadow-sm md:rounded-xl md:shadow-lg p-4 md:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                                        Recent Bookings
                                    </h2>
                                    <Button
                                        onClick={() => setActiveTab('bookings')}
                                        variant="outline"
                                        size="sm"
                                        className="w-full sm:w-auto">
                                        View All
                                    </Button>
                                </div>

                                {bookings.length > 0 ? (
                                    <div className="space-y-3 md:space-y-4">
                                        {bookings.slice(0, 3).map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg">
                                                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                                    <img
                                                        src={
                                                            booking.car
                                                                ?.images?.[0] ||
                                                            '/placeholder-car.jpg'
                                                        }
                                                        alt={booking.car?.name}
                                                        className="w-12 h-10 sm:w-16 sm:h-12 object-cover rounded-lg"
                                                    />
                                                    <div className="overflow-hidden">
                                                        <h3 className="font-medium sm:font-semibold text-gray-900 truncate">
                                                            {booking.car?.name}
                                                        </h3>
                                                        <p className="text-xs sm:text-sm text-gray-600">
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
                                                <div className="flex sm:flex-col items-end sm:items-end justify-between sm:justify-center">
                                                    <span
                                                        className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                                                            booking.status,
                                                        )}`}>
                                                        {booking.status}
                                                    </span>
                                                    <p className="text-sm sm:text-base text-gray-600 sm:mt-1">
                                                        {formatCurrency(
                                                            booking.totalPrice,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 md:py-8">
                                        <Car className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                                        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-2">
                                            No bookings yet
                                        </h3>
                                        <p className="text-sm md:text-gray-600 mb-3 md:mb-4">
                                            Start exploring our amazing fleet of
                                            vehicles
                                        </p>
                                        <Button
                                            onClick={() => router.push('/cars')}
                                            size="sm"
                                            className="w-full sm:w-auto">
                                            Browse Cars
                                        </Button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Quick Actions*/}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-lg shadow-sm md:rounded-xl md:shadow-lg p-4 md:p-6">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                                    Quick Actions
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                                    <Button
                                        onClick={() => router.push('/cars')}
                                        className="flex items-center justify-center space-x-2 p-2 sm:p-3 md:p-4 h-auto">
                                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-sm md:text-base">
                                            Book New Car
                                        </span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setActiveTab('bookings')}
                                        className="flex items-center justify-center space-x-2 p-2 sm:p-3 md:p-4 h-auto">
                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-sm md:text-base">
                                            View Bookings
                                        </span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setActiveTab('profile')}
                                        className="flex items-center justify-center space-x-2 p-2 sm:p-3 md:p-4 h-auto">
                                        <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-sm md:text-base">
                                            Account Settings
                                        </span>
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
                            className="bg-white rounded-lg shadow-sm md:rounded-xl md:shadow-lg p-4 md:p-6">
                            {/* Header with filter */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    My Bookings
                                </h2>
                                <div className="w-full sm:w-auto">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) =>
                                            setFilterStatus(e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
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
                                <div className="space-y-3 md:space-y-4">
                                    {filteredBookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="border border-gray-200 rounded-lg p-4 md:p-6">
                                            {/* Top section - Car info */}
                                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                                <img
                                                    src={
                                                        booking.car
                                                            ?.images?.[0] ||
                                                        '/placeholder-car.jpg'
                                                    }
                                                    alt={booking.car?.name}
                                                    className="w-full h-24 sm:w-32 sm:h-24 md:w-20 md:h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                                                        {booking.car?.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {booking.car?.brand}{' '}
                                                        {booking.car?.model}
                                                    </p>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
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
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                                                            <span className="truncate max-w-[120px] md:max-w-none">
                                                                {
                                                                    booking.pickupLocation
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom section - Status and actions */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusColor(
                                                            booking.status,
                                                        )}`}>
                                                        {booking.status}
                                                    </span>
                                                    <div className="text-right sm:text-left">
                                                        <p className="text-sm md:text-base font-semibold text-gray-900">
                                                            {formatCurrency(
                                                                booking.totalPrice,
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {booking.totalDays}{' '}
                                                            day
                                                            {booking.totalDays >
                                                            1
                                                                ? 's'
                                                                : ''}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 self-end sm:self-auto">
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        className="flex items-center gap-1 px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm">
                                                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                                                        <span className="hidden sm:inline">
                                                            Details
                                                        </span>
                                                    </Button>
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        className="flex items-center gap-1 px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm">
                                                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                                                        <span className="hidden sm:inline">
                                                            Receipt
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 md:py-8">
                                    <Filter className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-2">
                                        No bookings found
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 md:mb-4">
                                        Try adjusting your filter or book a new
                                        car
                                    </p>
                                    <Button
                                        onClick={() => router.push('/cars')}
                                        size="sm"
                                        className="w-full sm:w-auto">
                                        Browse Cars
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg shadow-sm md:rounded-xl md:shadow-lg p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
                                Profile Settings
                            </h2>

                            <div className="space-y-4 md:space-y-6">
                                {/* Profile Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5 md:w-8 md:h-8 text-primary-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                                            {user?.name}
                                        </h3>
                                        <p className="text-sm md:text-gray-600 truncate">
                                            {user?.email}
                                        </p>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="mt-2 w-full sm:w-auto">
                                            Change Photo
                                        </Button>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name}
                                            className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto">
                                        Cancel
                                    </Button>
                                    <Button className="w-full sm:w-auto">
                                        Save Changes
                                    </Button>
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
