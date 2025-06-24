'use client';

import { useForm } from 'react-hook-form';
import { User, Mail, Phone, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isValidEmail, isValidPhone } from '@/lib/utils.js';

const CustomerForm = ({ bookingData, onStepComplete, onPrevStep }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: bookingData.customer || {},
    });

    const onSubmit = (data) => {
        onStepComplete({ customer: data });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        First Name
                    </label>
                    <input
                        type="text"
                        {...register('firstName', {
                            required: 'First name is required',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        Last Name
                    </label>
                    <input
                        type="text"
                        {...register('lastName', {
                            required: 'Last name is required',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-1" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            validate: (value) =>
                                isValidEmail(value) ||
                                'Please enter a valid email',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email address"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-1" />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        {...register('phone', {
                            required: 'Phone number is required',
                            validate: (value) =>
                                isValidPhone(value) ||
                                'Please enter a valid phone number',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Address Information */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="inline w-4 h-4 mr-1" />
                    Street Address
                </label>
                <input
                    type="text"
                    {...register('address', {
                        required: 'Address is required',
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your street address"
                />
                {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        City
                    </label>
                    <input
                        type="text"
                        {...register('city', { required: 'City is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your city"
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                    </label>
                    <input
                        type="text"
                        {...register('zipCode', {
                            required: 'ZIP code is required',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.zipCode.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                    </label>
                    <select
                        {...register('country', {
                            required: 'Country is required',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                    </select>
                    {errors.country && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.country.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Driver's License */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver's License Number
                </label>
                <input
                    type="text"
                    {...register('licenseNumber', {
                        required: "Driver's license number is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your driver's license number"
                />
                {errors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.licenseNumber.message}
                    </p>
                )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    {...register('agreeToTerms', {
                        required: 'You must agree to the terms and conditions',
                    })}
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="text-sm">
                    <label className="text-gray-700">
                        I agree to the{' '}
                        <a
                            href="/terms"
                            className="text-primary-600 hover:text-primary-800 underline">
                            Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a
                            href="/privacy"
                            className="text-primary-600 hover:text-primary-800 underline">
                            Privacy Policy
                        </a>
                    </label>
                    {errors.agreeToTerms && (
                        <p className="mt-1 text-red-600">
                            {errors.agreeToTerms.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-1.5 mx-auto">
                <Button type="button" variant="outline" onClick={onPrevStep} >
                    Back to Dates
                </Button>
                <Button type="submit">Continue to Payment</Button>
            </div>
        </form>
    );
};

export default CustomerForm;
