'use client';

import { motion } from 'framer-motion';
import {
    CheckCircle,
    Calendar,
    MapPin,
    Car,
    User,
    CreditCard,
    Download,
    Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils.js';
import { useRouter } from 'next/navigation';

const BookingConfirmation = ({ car, bookingData, days, totalPrice }) => {
    const router = useRouter();

    const handleDownloadReceipt = () => {
        // In a real app, this would generate and download a PDF receipt
        alert('Receipt download functionality would be implemented here');
    };

    const handleEmailReceipt = () => {
        // In a real app, this would send an email receipt
        alert('Email receipt functionality would be implemented here');
    };

    return (
        <div className="text-center space-y-8">
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="flex justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Booking Confirmed!
                </h2>
                <p className="text-lg text-gray-600 mb-2">
                    Your reservation has been successfully confirmed.
                </p>
                <p className="text-sm text-gray-500">
                    Booking ID:{' '}
                    <span className="font-mono font-semibold">
                        #{bookingData.bookingId || 'BK001'}
                    </span>
                </p>
            </motion.div>

            {/* Booking Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-xl p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Booking Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Car Information */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Car className="w-5 h-5 text-primary-500" />
                            <div>
                                <div className="font-semibold text-gray-900">
                                    {car.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {car.brand} • {car.year}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-primary-500" />
                            <div>
                                <div className="font-semibold text-gray-900">
                                    Rental Period
                                </div>
                                <div className="text-sm text-gray-600">
                                    {formatDate(bookingData.dates.pickupDate)} -{' '}
                                    {formatDate(bookingData.dates.dropoffDate)}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {days} day{days > 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-primary-500" />
                            <div>
                                <div className="font-semibold text-gray-900">
                                    Pickup Location
                                </div>
                                <div className="text-sm text-gray-600">
                                    {bookingData.locations.pickupLocation}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {bookingData.dates.pickupTime}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-primary-500" />
                            <div>
                                <div className="font-semibold text-gray-900">
                                    Customer
                                </div>
                                <div className="text-sm text-gray-600">
                                    {bookingData.customer.firstName}{' '}
                                    {bookingData.customer.lastName}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {bookingData.customer.email}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <CreditCard className="w-5 h-5 text-primary-500" />
                            <div>
                                <div className="font-semibold text-gray-900">
                                    Payment
                                </div>
                                <div className="text-sm text-gray-600">
                                    **** **** ****{' '}
                                    {bookingData.payment?.cardNumber?.slice(
                                        -4,
                                    ) || '****'}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Total: {formatCurrency(totalPrice)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Services */}
                {bookingData.additionalServices &&
                    bookingData.additionalServices.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                Additional Services
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {bookingData.additionalServices.map(
                                    (service, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                            {service}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
            </motion.div>

            {/* Next Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    What's Next?
                </h3>
                <div className="text-left space-y-3 text-blue-800">
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 text-sm font-bold">
                                1
                            </span>
                        </div>
                        <div>
                            <div className="font-medium">
                                Confirmation Email
                            </div>
                            <div className="text-sm">
                                You'll receive a confirmation email with all
                                details shortly.
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 text-sm font-bold">
                                2
                            </span>
                        </div>
                        <div>
                            <div className="font-medium">
                                Pickup Preparation
                            </div>
                            <div className="text-sm">
                                Bring your driver's license and credit card for
                                pickup.
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 text-sm font-bold">
                                3
                            </span>
                        </div>
                        <div>
                            <div className="font-medium">
                                Vehicle Inspection
                            </div>
                            <div className="text-sm">
                                We'll inspect the vehicle together before you
                                drive away.
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    onClick={handleDownloadReceipt}
                    variant="outline"
                    className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Receipt</span>
                </Button>

                <Button
                    onClick={handleEmailReceipt}
                    variant="outline"
                    className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Receipt</span>
                </Button>

                <Button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center space-x-2">
                    <span>View My Bookings</span>
                </Button>
            </motion.div>

            {/* Support Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center text-gray-600">
                <p className="text-sm">
                    Need help? Contact our support team at{' '}
                    <a
                        href="tel:+1555123456"
                        className="text-primary-600 hover:text-primary-800">
                        +1 (555) 123-4567
                    </a>{' '}
                    or{' '}
                    <a
                        href="mailto:support@rentcar.com"
                        className="text-primary-600 hover:text-primary-800">
                        support@rentcar.com
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default BookingConfirmation;
