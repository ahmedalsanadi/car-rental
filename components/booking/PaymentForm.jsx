'use client';

import { useForm } from 'react-hook-form';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils.js';
import { createBooking } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PaymentForm = ({
    bookingData,
    onStepComplete,
    onPrevStep,
    totalPrice,
    isSubmitting,
    setIsSubmitting,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: bookingData.payment || {},
    });

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            // Simulate payment processing
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Create booking
            const bookingPayload = {
                ...bookingData,
                payment: data,
                totalPrice,
                status: 'Confirmed',
            };

            const booking = await createBooking(bookingPayload);

            toast.success('Booking confirmed successfully!');
            onStepComplete({ payment: data, bookingId: booking.id });
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Payment Method */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                    Payment Method
                </h3>
                <div className="flex items-center space-x-3">
                    <input
                        type="radio"
                        id="credit-card"
                        name="paymentMethod"
                        value="credit-card"
                        defaultChecked
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <label
                        htmlFor="credit-card"
                        className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span>Credit/Debit Card</span>
                    </label>
                </div>
            </div>

            {/* Card Information */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="inline w-4 h-4 mr-1" />
                    Card Number
                </label>
                <input
                    type="text"
                    {...register('cardNumber', {
                        required: 'Card number is required',
                        pattern: {
                            value: /^[0-9\s]{13,19}$/,
                            message: 'Please enter a valid card number',
                        },
                    })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.cardNumber.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                    </label>
                    <input
                        type="text"
                        {...register('expiryDate', {
                            required: 'Expiry date is required',
                            pattern: {
                                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                message:
                                    'Please enter a valid expiry date (MM/YY)',
                            },
                        })}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.expiryDate.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                    </label>
                    <input
                        type="text"
                        {...register('cvv', {
                            required: 'CVV is required',
                            pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: 'Please enter a valid CVV',
                            },
                        })}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.cvv.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                </label>
                <input
                    type="text"
                    {...register('cardholderName', {
                        required: 'Cardholder name is required',
                    })}
                    placeholder="Enter name as it appears on card"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.cardholderName && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.cardholderName.message}
                    </p>
                )}
            </div>

            {/* Billing Address */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    {...register('sameAsCustomer')}
                    defaultChecked
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="text-sm text-gray-700">
                    Billing address is the same as customer address
                </label>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">
                            Secure Payment
                        </h4>
                        <p className="text-sm text-green-800">
                            Your payment is protected by 256-bit SSL encryption.
                            We never store your card details.
                        </p>
                    </div>
                </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                        Total Amount:
                    </span>
                    <span className="text-2xl font-bold text-primary-500">
                        {formatCurrency(totalPrice)}
                    </span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-1.5 mx-auto">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onPrevStep}
                    disabled={isSubmitting}>
                    Back to Personal Info
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[150px]">
                    {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                        </div>
                    ) : (
                        <>
                            <Lock className="w-4 h-4 mr-2" />
                            Complete Booking
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default PaymentForm;
