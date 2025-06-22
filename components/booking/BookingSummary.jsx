'use client';

import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils.js';

const BookingSummary = ({ car, bookingData, days }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
            </h3>

            {/* Car Information */}
            <div className="flex items-center space-x-4 mb-6">
                <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-20 h-16 object-cover rounded-lg"
                />
                <div>
                    <h4 className="font-semibold text-gray-900">{car.name}</h4>
                    <p className="text-sm text-gray-600">
                        {car.brand} • {car.year}
                    </p>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="w-3 h-3" />
                        <span>{car.seats} seats</span>
                    </div>
                </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
                {bookingData.dates.pickupDate &&
                    bookingData.dates.dropoffDate && (
                        <div className="flex items-start space-x-3">
                            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                    Rental Period
                                </div>
                                <div className="text-gray-600">
                                    {formatDate(bookingData.dates.pickupDate)} -{' '}
                                    {formatDate(bookingData.dates.dropoffDate)}
                                </div>
                                <div className="text-gray-600">
                                    {days} day{days > 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>
                    )}

                {bookingData.dates.pickupTime && (
                    <div className="flex items-start space-x-3">
                        <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div className="text-sm">
                            <div className="font-medium text-gray-900">
                                Pickup Time
                            </div>
                            <div className="text-gray-600">
                                {bookingData.dates.pickupTime}
                            </div>
                        </div>
                    </div>
                )}

                {bookingData.locations.pickupLocation && (
                    <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div className="text-sm">
                            <div className="font-medium text-gray-900">
                                Pickup Location
                            </div>
                            <div className="text-gray-600">
                                {bookingData.locations.pickupLocation}
                            </div>
                        </div>
                    </div>
                )}

                {bookingData.locations.dropoffLocation &&
                    bookingData.locations.dropoffLocation !==
                        bookingData.locations.pickupLocation && (
                        <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="text-sm">
                                <div className="font-medium text-gray-900">
                                    Drop-off Location
                                </div>
                                <div className="text-gray-600">
                                    {bookingData.locations.dropoffLocation}
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* Additional Services */}
            {bookingData.additionalServices &&
                bookingData.additionalServices.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">
                            Additional Services
                        </h4>
                        <div className="space-y-1">
                            {bookingData.additionalServices.map(
                                (service, index) => (
                                    <div
                                        key={index}
                                        className="text-sm text-gray-600">
                                        • {service}
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default BookingSummary;
