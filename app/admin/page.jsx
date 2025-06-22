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
    Filter,
    Search,
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
    const { user, isAuthenticated, isAdmin } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [dashboardData, setDashboardData] = useState({});
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
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
    }, [isAuthenticated, isAdmin, router]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'cars', label: 'Cars', icon: Car },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'customers', label: 'Customers', icon: Users },
    ];

    if (loading) {
        return <Loading message="Loading admin dashboard..." />;
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
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your car rental business
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
                                            className="bg-white rounded-xl shadow-lg p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">
                                                        {stat.title}
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {stat.value}
                                                    </p>
                                                    <p className="text-sm text-green-600 mt-1">
                                                        {stat.change} from last
                                                        month
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

                            {/* Recent Activity */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Recent Bookings */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Recent Bookings
                                    </h3>
                                    <div className="space-y-4">
                                        {bookings.slice(0, 5).map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {booking.customer?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
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
                                                    <p className="text-sm text-gray-600 mt-1">
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
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Fleet Status
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Available Cars
                                            </span>
                                            <span className="font-semibold text-green-600">
                                                {dashboardData.availableCars}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Rented Cars
                                            </span>
                                            <span className="font-semibold text-blue-600">
                                                {dashboardData.totalCars -
                                                    dashboardData.availableCars}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Active Bookings
                                            </span>
                                            <span className="font-semibold text-orange-600">
                                                {dashboardData.activeBookings}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Pending Bookings
                                            </span>
                                            <span className="font-semibold text-yellow-600">
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
                            className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Car Management
                                </h2>
                                <Button className="flex items-center space-x-2">
                                    <Plus className="w-4 h-4" />
                                    <span>Add New Car</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="border border-gray-200 rounded-lg p-4">
                                        <img
                                            src={car.images[0]}
                                            alt={car.name}
                                            className="w-full h-32 object-cover rounded-lg mb-4"
                                        />
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {car.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {car.brand} • {car.year}
                                        </p>
                                        <p className="text-lg font-bold text-primary-500 mb-4">
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
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline">
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline">
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
                            className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Booking Management
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search bookings..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                        <option>All Status</option>
                                        <option>Pending</option>
                                        <option>Confirmed</option>
                                        <option>Active</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Booking ID
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Customer
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Car
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Dates
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Total
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Status
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr
                                                key={booking.id}
                                                className="border-b border-gray-100">
                                                <td className="py-3 px-4">
                                                    #{booking.id}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {booking.customer?.name}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {booking.car?.name}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {formatDate(
                                                        booking.startDate,
                                                    )}{' '}
                                                    -{' '}
                                                    {formatDate(
                                                        booking.endDate,
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {formatCurrency(
                                                        booking.totalPrice,
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                            booking.status,
                                                        )}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline">
                                                            <Eye className="w-3 h-3" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline">
                                                            <Edit className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'customers' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Customer Management
                                </h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search customers..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {customers.map((customer) => (
                                    <div
                                        key={customer.id}
                                        className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Users className="w-6 h-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {customer.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {customer.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
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

                                        <div className="mt-4 flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1">
                                                <Eye className="w-3 h-3 mr-1" />
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="flex-1">
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
