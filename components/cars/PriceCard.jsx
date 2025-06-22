'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    Plus,
    Minus,
    Shield,
    Wifi,
    Baby,
} from 'lucide-react';
import { formatCurrency, calculateTotalPrice } from '@/lib/utils.js';
import { Button } from '@/components/ui/button';

const PriceCard = ({ car, onBookNow }) => {
    const [bookingDetails, setBookingDetails] = useState({
        pickupDate: '',
        dropoffDate: '',
        pickupTime: '10:00',
        dropoffTime: '10:00',
        pickupLocation: car.location,
        dropoffLocation: car.location,
        additionalServices: [],
    });

    const [days, setDays] = useState(1);

    const additionalServices = [
        { id: 'gps', name: 'GPS Navigation', price: 5, icon: MapPin },
        { id: 'childSeat', name: 'Child Seat', price: 10, icon: Baby },
        { id: 'wifi', name: 'WiFi Hotspot', price: 8, icon: Wifi },
        { id: 'insurance', name: 'Full Insurance', price: 20, icon: Shield },
        {
            id: 'additionalDriver',
            name: 'Additional Driver',
            price: 15,
            icon: Plus,
        },
    ];

    const handleServiceToggle = (serviceId) => {
        setBookingDetails((prev) => ({
            ...prev,
            additionalServices: prev.additionalServices.includes(serviceId)
                ? prev.additionalServices.filter((id) => id !== serviceId)
                : [...prev.additionalServices, serviceId],
        }));
    };

    const handleDateChange = (field, value) => {
        setBookingDetails((prev) => ({ ...prev, [field]: value }));

        // Calculate days if both dates are set
        if (field === 'pickupDate' || field === 'dropoffDate') {
            const pickup =
                field === 'pickupDate' ? value : bookingDetails.pickupDate;
            const dropoff =
                field === 'dropoffDate' ? value : bookingDetails.dropoffDate;

            if (pickup && dropoff) {
                const pickupDate = new Date(pickup);
                const dropoffDate = new Date(dropoff);
                const diffTime = Math.abs(dropoffDate - pickupDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDays(Math.max(1, diffDays));
            }
        }
    };

    const selectedServiceNames = bookingDetails.additionalServices
        .map((serviceId) => {
            const service = additionalServices.find((s) => s.id === serviceId);
            return service ? service.name : '';
        })
        .filter(Boolean);

    const totalPrice = calculateTotalPrice(
        car.price,
        days,
        selectedServiceNames,
    );
    const servicesTotal = selectedServiceNames.reduce((total, serviceName) => {
        const service = additionalServices.find((s) => s.name === serviceName);
        return total + (service ? service.price * days : 0);
    }, 0);

    const handleBooking = () => {
        const bookingData = {
            ...bookingDetails,
            carId: car.id,
            days,
            totalPrice,
            additionalServices: selectedServiceNames,
        };
        onBookNow(bookingData);
    };

    const isBookingValid =
        bookingDetails.pickupDate && bookingDetails.dropoffDate;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-primary-500">
                        {formatCurrency(car.price)}
                    </span>
                    <span className="text-gray-600">per day</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <span>⭐ {car.rating}</span>
                    <span>•</span>
                    <span>{car.reviews} reviews</span>
                </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4 mb-6">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pickup Date
                        </label>
                        <input
                            type="date"
                            value={bookingDetails.pickupDate}
                            onChange={(e) =>
                                handleDateChange('pickupDate', e.target.value)
                            }
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Return Date
                        </label>
                        <input
                            type="date"
                            value={bookingDetails.dropoffDate}
                            onChange={(e) =>
                                handleDateChange('dropoffDate', e.target.value)
                            }
                            min={
                                bookingDetails.pickupDate ||
                                new Date().toISOString().split('T')[0]
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pickup Time
                        </label>
                        <input
                            type="time"
                            value={bookingDetails.pickupTime}
                            onChange={(e) =>
                                setBookingDetails((prev) => ({
                                    ...prev,
                                    pickupTime: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Return Time
                        </label>
                        <input
                            type="time"
                            value={bookingDetails.dropoffTime}
                            onChange={(e) =>
                                setBookingDetails((prev) => ({
                                    ...prev,
                                    dropoffTime: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Location
                    </label>
                    <select
                        value={bookingDetails.pickupLocation}
                        onChange={(e) =>
                            setBookingDetails((prev) => ({
                                ...prev,
                                pickupLocation: e.target.value,
                            }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm">
                        <option value="Downtown">Downtown</option>
                        <option value="Airport">Airport</option>
                        <option value="Suburban">Suburban</option>
                        <option value="Tech District">Tech District</option>
                    </select>
                </div>
            </div>

            {/* Additional Services */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                    Additional Services
                </h4>
                <div className="space-y-2">
                    {additionalServices.map((service) => {
                        const Icon = service.icon;
                        const isSelected =
                            bookingDetails.additionalServices.includes(
                                service.id,
                            );

                        return (
                            <div
                                key={service.id}
                                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                                    isSelected
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => handleServiceToggle(service.id)}>
                                <div className="flex items-center space-x-3">
                                    <Icon
                                        className={`w-4 h-4 ${
                                            isSelected
                                                ? 'text-primary-600'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                    <span
                                        className={`text-sm ${
                                            isSelected
                                                ? 'text-primary-900'
                                                : 'text-gray-700'
                                        }`}>
                                        {service.name}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span
                                        className={`text-sm font-medium ${
                                            isSelected
                                                ? 'text-primary-600'
                                                : 'text-gray-600'
                                        }`}>
                                        {formatCurrency(service.price)}/day
                                    </span>
                                    <div
                                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                            isSelected
                                                ? 'border-primary-500 bg-primary-500'
                                                : 'border-gray-300'
                                        }`}>
                                        {isSelected && (
                                            <span className="text-white text-xs">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            {formatCurrency(car.price)} × {days} day
                            {days > 1 ? 's' : ''}
                        </span>
                        <span className="text-gray-900">
                            {formatCurrency(car.price * days)}
                        </span>
                    </div>

                    {servicesTotal > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">
                                Additional services
                            </span>
                            <span className="text-gray-900">
                                {formatCurrency(servicesTotal)}
                            </span>
                        </div>
                    )}

                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-primary-500">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Book Now Button */}
            <Button
                onClick={handleBooking}
                disabled={!isBookingValid}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isBookingValid ? 'Book Now' : 'Select Dates to Book'}
            </Button>

            {/* Additional Info */}
            <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Free cancellation up to 24 hours before pickup</p>
                <p>• No hidden fees or charges</p>
                <p>• 24/7 customer support</p>
            </div>
        </motion.div>
    );
};

export default PriceCard;
