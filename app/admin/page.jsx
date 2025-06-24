'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
    Car,
    Users,
    Calendar,
    DollarSign,
    TrendingUp,
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import {
    getDashboardData,
    getCars,
    getAllBookings,
    getCustomers,
} from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils.js';
import { Button } from '@/components/ui/button';
import Loading from '@/components/layout/Loading';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const {
        user,
        isAuthenticated,
        isAdmin,
        loading: authLoading,
        mounted,
    } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [dashboardData, setDashboardData] = useState({});
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile on mount and on resize
        const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        // wait for auth to be mounted and loaded
        if (!mounted || authLoading) return;

        // check authentication after auth has loaded
        if (!isAuthenticated() || !isAdmin()) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const [dashboard, carsData, bookingsData, customersData] =
                    await Promise.all([
                        getDashboardData(),
                        getCars(),
                        getAllBookings(),
                        getCustomers(),
                    ]);

                setDashboardData(dashboard);
                setCars(carsData);
                setBookings(bookingsData);
                setCustomers(customersData);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [mounted, authLoading, isAuthenticated, isAdmin, router]);

    // show loading while auth is initializing
    if (!mounted || authLoading) {
        return <Loading message="Initializing..." />;
    }

    // show loading while data is being fetched
    if (loading) {
        return <Loading message="Loading admin dashboard..." />;
    }

    // if not authenticated or not admin, don't render anything
    // (redirect will happen in useEffect)
    if (!isAuthenticated() || !isAdmin()) {
        return null;
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'cars', label: 'Cars', icon: Car },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'customers', label: 'Customers', icon: Users },
    ];

    const MobileBookingCard = ({ booking }) => (
        <div className="bg-white rounded-lg shadow p-4 mb-3">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-medium text-gray-900">#{booking.id}</p>
                    <p className="text-sm text-gray-600">
                        {booking.customer?.name}
                    </p>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                </span>
            </div>
            <div className="text-sm space-y-1">
                <p className="flex justify-between">
                    <span className="text-gray-600">Car:</span>
                    <span className="text-gray-900">{booking.car?.name}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-gray-600">Dates:</span>
                    <span className="text-gray-900">
                        {formatDate(booking.startDate)} -{' '}
                        {formatDate(booking.endDate)}
                    </span>
                </p>
                <p className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-gray-900 font-medium">
                        {formatCurrency(booking.totalPrice)}
                    </span>
                </p>
            </div>
            <div className="flex justify-end space-x-2 mt-3">
                <Button size="sm" variant="outline" className="p-2">
                    <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-2">
                    <Edit className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-4 md:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 md:mb-8 px-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-gray-600">
                        Manage your car rental business
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 md:mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex overflow-x-auto px-1 scrollbar-hide">
                            <div className="flex space-x-4 md:space-x-8 min-w-max">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-2 md:py-3 px-1 border-b-2 font-medium text-xs md:text-sm flex items-center space-x-1 md:space-x-2 whitespace-nowrap ${
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
                <div className="space-y-6 md:space-y-8 px-1">
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                                {[
                                    {
                                        title: 'Total Cars',
                                        value: dashboardData.totalCars,
                                        icon: Car,
                                        color: 'bg-blue-500',
                                        change: '+12%',
                                    },
                                    {
                                        title: 'Total Bookings',
                                        value: dashboardData.totalBookings,
                                        icon: Calendar,
                                        color: 'bg-green-500',
                                        change: '+8%',
                                    },
                                    {
                                        title: 'Total Customers',
                                        value: dashboardData.totalCustomers,
                                        icon: Users,
                                        color: 'bg-purple-500',
                                        change: '+15%',
                                    },
                                    {
                                        title: 'Revenue',
                                        value: formatCurrency(
                                            dashboardData.revenue,
                                        ),
                                        icon: DollarSign,
                                        color: 'bg-orange-500',
                                        change: '+23%',
                                    },
                                ].map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div
                                            key={stat.title}
                                            className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs md:text-sm font-medium text-gray-600">
                                                        {stat.title}
                                                    </p>
                                                    <p className="text-xl md:text-2xl font-bold text-gray-900">
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-xs md:text-sm text-green-600 mt-1">
                                                        {stat.change} from last
                                                        month
                                                    </p>
                                                </div>
                                                <div
                                                    className={`${stat.color} p-2 md:p-3 rounded-lg`}>
                                                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Recent Activity */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                                {/* Recent Bookings */}
                                <div className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                                        Recent Bookings
                                    </h3>
                                    <div className="space-y-3">
                                        {bookings.slice(0, 5).map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex items-center justify-between p-2 md:p-3 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-gray-900">
                                                        {booking.customer?.name}
                                                    </p>
                                                    <p className="text-xs md:text-sm text-gray-600">
                                                        {booking.car?.name}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                            booking.status,
                                                        )}`}>
                                                        {booking.status}
                                                    </span>
                                                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                                                        {formatCurrency(
                                                            booking.totalPrice,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Fleet Status */}
                                <div className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                                        Fleet Status
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm md:text-base text-gray-600">
                                                Available Cars
                                            </span>
                                            <span className="text-sm md:text-base font-semibold text-green-600">
                                                {dashboardData.availableCars}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm md:text-base text-gray-600">
                                                Rented Cars
                                            </span>
                                            <span className="text-sm md:text-base font-semibold text-blue-600">
                                                {dashboardData.totalCars -
                                                    dashboardData.availableCars}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm md:text-base text-gray-600">
                                                Active Bookings
                                            </span>
                                            <span className="text-sm md:text-base font-semibold text-orange-600">
                                                {dashboardData.activeBookings}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm md:text-base text-gray-600">
                                                Pending Bookings
                                            </span>
                                            <span className="text-sm md:text-base font-semibold text-yellow-600">
                                                {dashboardData.pendingBookings}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}

                    {activeTab === 'cars' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Car Management
                                </h2>
                                <Button className="flex items-center space-x-1 md:space-x-2 w-full md:w-auto justify-center">
                                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                                    <span>Add New Car</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="border border-gray-200 rounded-lg p-3 md:p-4">
                                        <img
                                            src={car.images[0]}
                                            alt={car.name}
                                            className="w-full h-28 md:h-32 object-cover rounded-lg mb-3 md:mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
                                            {car.name}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                                            {car.brand} • {car.year}
                                        </p>
                                        <p className="text-base md:text-lg font-bold text-primary-500 mb-3 md:mb-4">
                                            {formatCurrency(car.price)}/day
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    car.available
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                {car.available
                                                    ? 'Available'
                                                    : 'Rented'}
                                            </span>
                                            <div className="flex space-x-1 md:space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="p-1 md:p-2">
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="p-1 md:p-2">
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'bookings' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Booking Management
                                </h2>
                                <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-48">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search bookings..."
                                            className="pl-8 pr-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                                        />
                                    </div>
                                    <select className="px-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full md:w-auto">
                                        <option>All Status</option>
                                        <option>Pending</option>
                                        <option>Confirmed</option>
                                        <option>Active</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            </div>

                            {isMobile ? (
                                <div className="space-y-3">
                                    {bookings.map((booking) => (
                                        <MobileBookingCard
                                            key={booking.id}
                                            booking={booking}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Booking ID
                                                </th>
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Customer
                                                </th>
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Car
                                                </th>
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Dates
                                                </th>
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Total
                                                </th>
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Status
                                                </th>
                                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-gray-700">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr
                                                    key={booking.id}
                                                    className="border-b border-gray-100">
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        #{booking.id}
                                                    </td>
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        {booking.customer?.name}
                                                    </td>
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        {booking.car?.name}
                                                    </td>
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        {formatDate(
                                                            booking.startDate,
                                                        )}{' '}
                                                        -{' '}
                                                        {formatDate(
                                                            booking.endDate,
                                                        )}
                                                    </td>
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        {formatCurrency(
                                                            booking.totalPrice,
                                                        )}
                                                    </td>
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                                booking.status,
                                                            )}`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                                                        <div className="flex space-x-1 md:space-x-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="p-1 md:p-2">
                                                                <Eye className="w-3 h-3" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="p-1 md:p-2">
                                                                <Edit className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'customers' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Customer Management
                                </h2>
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        className="pl-8 pr-3 py-2 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {customers.map((customer) => (
                                    <div
                                        key={customer.id}
                                        className="border border-gray-200 rounded-lg p-4 md:p-6">
                                        <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Users className="w-4 h-4 md:w-5 md:h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-semibold text-gray-900">
                                                    {customer.name}
                                                </h3>
                                                <p className="text-xs md:text-sm text-gray-600">
                                                    {customer.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Phone:
                                                </span>
                                                <span className="text-gray-900">
                                                    {customer.phone}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Bookings:
                                                </span>
                                                <span className="text-gray-900">
                                                    {customer.totalBookings}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Joined:
                                                </span>
                                                <span className="text-gray-900">
                                                    {formatDate(
                                                        customer.joinDate,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">
                                                    Status:
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        customer.status,
                                                    )}`}>
                                                    {customer.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-3 md:mt-4 flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 text-xs md:text-sm py-1 h-auto">
                                                <Eye className="w-3 h-3 mr-1" />
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 text-xs md:text-sm py-1 h-auto">
                                                <Edit className="w-3 h-3 mr-1" />
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
