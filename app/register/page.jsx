'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    Car,
    ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register: registerUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const watchPassword = watch('password');

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const result = await registerUser({
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                password: data.password,
            });

            if (result.success) {
                toast.success('Account created successfully!');
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary-500 p-3 rounded-full">
                            <Car className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-600">
                        Join RentCar and start your journey
                    </p>
                </motion.div>

                {/* Registration Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-8">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        {...register('firstName', {
                                            required: 'First name is required',
                                        })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="First name"
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        {...register('lastName', {
                                            required: 'Last name is required',
                                        })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="Last name"
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                'Please enter a valid email',
                                        },
                                    })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[\+]?[1-9][\d]{0,15}$/,
                                            message:
                                                'Please enter a valid phone number',
                                        },
                                    })}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must be at least 6 characters',
                                        },
                                    })}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    {...register('confirmPassword', {
                                        required:
                                            'Please confirm your password',
                                        validate: (value) =>
                                            value === watchPassword ||
                                            'Passwords do not match',
                                    })}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                {...register('agreeToTerms', {
                                    required: 'You must agree to the terms',
                                })}
                                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <div className="text-sm">
                                <label className="text-gray-700">
                                    I agree to the{' '}
                                    <Link
                                        href="/terms"
                                        className="text-primary-600 hover:text-primary-800 underline">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href="/privacy"
                                        className="text-primary-600 hover:text-primary-800 underline">
                                        Privacy Policy
                                    </Link>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="mt-1 text-red-600">
                                        {errors.agreeToTerms.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-primary-600 hover:text-primary-800 font-medium">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-3 gap-4 text-center">
                    {[
                        { icon: '🎯', text: 'Easy Booking' },
                        { icon: '💳', text: 'Secure Payment' },
                        { icon: '🚗', text: 'Premium Cars' },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl mb-1">{feature.icon}</div>
                            <div className="text-sm text-gray-600">
                                {feature.text}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;
