'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const DatePicker = ({ bookingData, onStepComplete, car }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            pickupDate: bookingData.dates?.pickupDate || '',
            dropoffDate: bookingData.dates?.dropoffDate || '',
            pickupTime: bookingData.dates?.pickupTime || '10:00',
            dropoffTime: bookingData.dates?.dropoffTime || '10:00',
            pickupLocation:
                bookingData.locations?.pickupLocation || car.location,
            dropoffLocation:
                bookingData.locations?.dropoffLocation || car.location,
        },
    });

    const watchedPickupDate = watch('pickupDate');

    const locations = [
        'Downtown',
        'Airport',
        'Suburban',
        'Tech District',
        'Business Center',
        'Hotel District',
    ];

    const onSubmit = (data) => {
        const pickupDate = new Date(data.pickupDate);
        const dropoffDate = new Date(data.dropoffDate);

        if (dropoffDate <= pickupDate) {
            toast.error('Drop-off date must be after pickup date');
            return;
        }

        const dates = {
            pickupDate: data.pickupDate,
            dropoffDate: data.dropoffDate,
            pickupTime: data.pickupTime,
            dropoffTime: data.dropoffTime,
        };

        const locations = {
            pickupLocation: data.pickupLocation,
            dropoffLocation: data.dropoffLocation,
        };

        onStepComplete({ dates, locations });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Pickup Date
                    </label>
                    <input
                        type="date"
                        {...register('pickupDate', {
                            required: 'Pickup date is required',
                        })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.pickupDate && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.pickupDate.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Drop-off Date
                    </label>
                    <input
                        type="date"
                        {...register('dropoffDate', {
                            required: 'Drop-off date is required',
                        })}
                        min={
                            watchedPickupDate ||
                            new Date().toISOString().split('T')[0]
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.dropoffDate && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.dropoffDate.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Pickup Time
                    </label>
                    <input
                        type="time"
                        {...register('pickupTime')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Drop-off Time
                    </label>
                    <input
                        type="time"
                        {...register('dropoffTime')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Location Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        Pickup Location
                    </label>
                    <select
                        {...register('pickupLocation', {
                            required: 'Pickup location is required',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                    {errors.pickupLocation && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.pickupLocation.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        Drop-off Location
                    </label>
                    <select
                        {...register('dropoffLocation', {
                            required: 'Drop-off location is required',
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                    {errors.dropoffLocation && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.dropoffLocation.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Special Requests */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                </label>
                <textarea
                    {...register('specialRequests')}
                    rows={3}
                    placeholder="Any special requests or requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div className="flex justify-end">
                <Button type="submit" className="px-8 py-3">
                    Continue to Personal Info
                </Button>
            </div>
        </form>
    );
};

export default DatePicker;
