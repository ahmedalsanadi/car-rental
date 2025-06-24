'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    Calendar,
    Clock,
    MapPin,
    User,
    CreditCard,
    Shield,
    CheckCircle,
} from 'lucide-react';
import { getCarById } from '@/lib/api';
import { formatCurrency, calculateTotalPrice } from '@/lib/utils.js';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import PriceBreakdown from '@/components/booking/PriceBreakdown';
import Loading from '@/components/layout/Loading';
import toast from 'react-hot-toast';

// Separate component that uses useSearchParams
const BookingPageContent = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        dates: {
            pickupDate: '',
            dropoffDate: '',
            pickupTime: '10:00',
            dropoffTime: '10:00',
        },
        locations: {
            pickupLocation: '',
            dropoffLocation: '',
        },
        customer: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zipCode: '',
            country: '',
        },
        payment: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
        },
        additionalServices: [],
        specialRequests: '',
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const carId = searchParams.get('carId');

    useEffect(() => {
        const fetchCarData = async () => {
            if (!carId) {
                toast.error('No car selected');
                router.push('/cars');
                return;
            }

            try {
                setLoading(true);
                const carData = await getCarById(carId);
                setCar(carData);

                // Set default pickup location
                setBookingData((prev) => ({
                    ...prev,
                    locations: {
                        pickupLocation: carData.location,
                        dropoffLocation: carData.location,
                    },
                }));
            } catch (error) {
                console.error('Error fetching car:', error);
                toast.error('Car not found');
                router.push('/cars');
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [carId, router]);

    const steps = [
        { id: 1, title: 'Dates & Location', icon: Calendar },
        { id: 2, title: 'Personal Info', icon: User },
        { id: 3, title: 'Payment', icon: CreditCard },
        { id: 4, title: 'Confirmation', icon: CheckCircle },
    ];

    const handleStepComplete = (stepData) => {
        setBookingData((prev) => ({ ...prev, ...stepData }));

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const calculateDays = () => {
        if (!bookingData.dates.pickupDate || !bookingData.dates.dropoffDate)
            return 1;

        const pickup = new Date(bookingData.dates.pickupDate);
        const dropoff = new Date(bookingData.dates.dropoffDate);
        const diffTime = Math.abs(dropoff - pickup);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, diffDays);
    };

    const days = calculateDays();
    const totalPrice = car
        ? calculateTotalPrice(car.price, days, bookingData.additionalServices)
        : 0;

    if (loading) {
        return <Loading message="Loading booking details..." />;
    }

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Car not found
                    </h2>
                    <Button onClick={() => router.push('/cars')}>
                        Back to Cars
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                        Complete Your Booking
                    </h1>
                    <p className="text-md md:text-lg text-gray-600">
                        You're just a few steps away from your perfect ride
                    </p>
                </motion.div>


                {/* Progress Steps */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 px-4"
                >
                {/* Mobile Steps (vertical) */}
                <div className="lg:hidden">
                    <div className="flex flex-col items-center space-y-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;
                        
                        return (
                        <div key={step.id} className="flex items-center w-full">
                            {/* Step Indicator */}
                            <div className="flex flex-col items-center mr-4">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                isCompleted
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : isActive
                                    ? 'bg-primary-500 border-primary-500 text-white'
                                    : 'bg-white border-gray-300 text-gray-400'
                                }`}
                            >
                                {isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                                ) : (
                                <Icon className="w-5 h-5" />
                                )}
                            </div>
                            </div>
                            
                            {/* Step Title */}
                            <div className="flex-1">
                            <span className="text-xs text-gray-500">Step {step.id}</span>
                            <h3
                                className={`font-medium ${
                                isActive || isCompleted
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                                }`}
                            >
                                {step.title}
                            </h3>
                            </div>
                            
                            {/* Connector (except last step) */}
                            {index < steps.length - 1 && (
                            <div className="absolute left-5 top-10 h-8 w-0.5 ml-4 ${
                                currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                            }" />
                            )}
                        </div>
                        );
                    })}
                    </div>
                </div>

                {/* Desktop Steps (horizontal) */}
                <div className="hidden lg:block">
                    <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div key={step.id} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                                    isCompleted
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : isActive
                                    ? 'bg-primary-500 border-primary-500 text-white'
                                    : 'bg-white border-gray-300 text-gray-400'
                                }`}
                                >
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    <Icon className="w-6 h-6" />
                                )}
                                </div>
                                <span
                                className={`mt-2 text-sm font-medium ${
                                    isActive || isCompleted
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                                }`}
                                >
                                {step.title}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                className={`w-16 h-0.5 mx-4 ${
                                    currentStep > step.id
                                    ? 'bg-green-500'
                                    : 'bg-gray-300'
                                }`}
                                />
                            )}
                            </div>
                        );
                        })}
                    </div>
                    </div>
                </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-lg p-6">
                            <BookingForm
                                currentStep={currentStep}
                                car={car}
                                bookingData={bookingData}
                                onStepComplete={handleStepComplete}
                                onPrevStep={handlePrevStep}
                                days={days}
                                totalPrice={totalPrice}
                            />
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Car Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}>
                            <BookingSummary
                                car={car}
                                bookingData={bookingData}
                                days={days}
                            />
                        </motion.div>

                        {/* Price Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}>
                            <PriceBreakdown
                                car={car}
                                days={days}
                                additionalServices={
                                    bookingData.additionalServices
                                }
                                totalPrice={totalPrice}
                            />
                        </motion.div>

                        {/* Security Notice */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-1">
                                        Secure Booking
                                    </h4>
                                    <p className="text-sm text-blue-800">
                                        Your payment information is encrypted
                                        and secure. We never store your card
                                        details.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component with Suspense boundary
const BookingPage = () => {
    return (
        <Suspense fallback={<Loading message="Loading booking..." />}>
            <BookingPageContent />
        </Suspense>
    );
};

export default BookingPage;
