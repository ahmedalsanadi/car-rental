'use client';

import { formatCurrency } from '@/lib/utils.js';

const PriceBreakdown = ({ car, days, additionalServices = [], totalPrice }) => {
    const basePrice = car.price * days;

    const servicesPricing = {
        gps: 5,
        childSeat: 10,
        wifi: 8,
        insurance: 20,
        additionalDriver: 15,
    };

    const servicesTotal = additionalServices.reduce((total, serviceId) => {
        const price = servicesPricing[serviceId] || 0;
        return total + price * days;
    }, 0);

    const tax = (basePrice + servicesTotal) * 0.1; // 10% tax
    const finalTotal = basePrice + servicesTotal + tax;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Price Breakdown
            </h3>

            <div className="space-y-3">
                {/* Base Price */}
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                        {formatCurrency(car.price)} × {days} day
                        {days > 1 ? 's' : ''}
                    </span>
                    <span className="font-medium text-gray-900">
                        {formatCurrency(basePrice)}
                    </span>
                </div>

                {/* Additional Services */}
                {additionalServices.length > 0 && (
                    <>
                        <div className="border-t border-gray-200 pt-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">
                                Additional Services
                            </div>
                            {additionalServices.map((serviceId, index) => {
                                const price = servicesPricing[serviceId] || 0;
                                const serviceName =
                                    {
                                        gps: 'GPS Navigation',
                                        childSeat: 'Child Seat',
                                        wifi: 'WiFi Hotspot',
                                        insurance: 'Full Insurance',
                                        additionalDriver: 'Additional Driver',
                                    }[serviceId] || serviceId;

                                return (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">
                                            {serviceName} × {days} day
                                            {days > 1 ? 's' : ''}
                                        </span>
                                        <span className="text-gray-900">
                                            {formatCurrency(price * days)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                                Services Subtotal
                            </span>
                            <span className="font-medium text-gray-900">
                                {formatCurrency(servicesTotal)}
                            </span>
                        </div>
                    </>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                        {formatCurrency(basePrice + servicesTotal)}
                    </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium text-gray-900">
                        {formatCurrency(tax)}
                    </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                    <span className="text-lg font-semibold text-gray-900">
                        Total
                    </span>
                    <span className="text-xl font-bold text-primary-500">
                        {formatCurrency(totalPrice || finalTotal)}
                    </span>
                </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 space-y-1">
                    <p>• Payment will be charged upon confirmation</p>
                    <p>• Free cancellation up to 24 hours before pickup</p>
                    <p>• Security deposit may be required at pickup</p>
                </div>
            </div>
        </div>
    );
};

export default PriceBreakdown;
