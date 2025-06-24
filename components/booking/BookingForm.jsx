'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Mail,
    Phone,
    Home,
    CreditCard,
    Plus,
    Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils.js';
import DatePicker from '@/components/booking/DatePicker';
import CustomerForm from '@/components/booking/CustomerForm';
import PaymentForm from '@/components/booking/PaymentForm';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import toast from 'react-hot-toast';

const BookingForm = ({
    currentStep,
    car,
    bookingData,
    onStepComplete,
    onPrevStep,
    days,
    totalPrice,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const additionalServices = [
        { id: 'gps', name: 'GPS Navigation', price: 5, icon: '🗺️' },
        { id: 'childSeat', name: 'Child Seat', price: 10, icon: '👶' },
        { id: 'wifi', name: 'WiFi Hotspot', price: 8, icon: '📶' },
        { id: 'insurance', name: 'Full Insurance', price: 20, icon: '🛡️' },
        {
            id: 'additionalDriver',
            name: 'Additional Driver',
            price: 15,
            icon: '👥',
        },
    ];

    const handleServiceToggle = (serviceId) => {
        const currentServices = bookingData.additionalServices || [];
        const updatedServices = currentServices.includes(serviceId)
            ? currentServices.filter((id) => id !== serviceId)
            : [...currentServices, serviceId];

        onStepComplete({ additionalServices: updatedServices });
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <Calendar className="w-6 h-6 text-primary-500" />
                            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                                Select Dates & Location
                            </h2>
                        </div>

                        <DatePicker
                            bookingData={bookingData}
                            onStepComplete={onStepComplete}
                            car={car}
                        />

                        {/* Additional Services */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Additional Services (Optional)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {additionalServices.map((service) => {
                                    const isSelected =
                                        bookingData.additionalServices?.includes(
                                            service.id,
                                        );

                                    return (
                                        <div
                                            key={service.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                                isSelected
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() =>
                                                handleServiceToggle(service.id)
                                            }>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl">
                                                        {service.icon}
                                                    </span>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {service.name}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {formatCurrency(
                                                                service.price,
                                                            )}
                                                            /day
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
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
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <User className="w-6 h-6 text-primary-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                Personal Information
                            </h2>
                        </div>

                        <CustomerForm
                            bookingData={bookingData}
                            onStepComplete={onStepComplete}
                            onPrevStep={onPrevStep}
                        />
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <CreditCard className="w-6 h-6 text-primary-500" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                Payment Information
                            </h2>
                        </div>

                        <PaymentForm
                            bookingData={bookingData}
                            onStepComplete={onStepComplete}
                            onPrevStep={onPrevStep}
                            totalPrice={totalPrice}
                            isSubmitting={isSubmitting}
                            setIsSubmitting={setIsSubmitting}
                        />
                    </div>
                );

            case 4:
                return (
                    <BookingConfirmation
                        car={car}
                        bookingData={bookingData}
                        days={days}
                        totalPrice={totalPrice}
                    />
                );

            default:
                return null;
        }
    };

    return <div className="min-h-[600px]">{renderStepContent()}</div>;
};

export default BookingForm;
