'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CarFilters = ({ filters, onFiltersChange, cars }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Get unique values for filter options
    const getUniqueValues = (key) => {
        return [...new Set(cars.map((car) => car[key]))].filter(Boolean).sort();
    };

    const brands = getUniqueValues('brand');
    const types = getUniqueValues('type');
    const transmissions = getUniqueValues('transmission');
    const fuels = getUniqueValues('fuel');
    const locations = getUniqueValues('location');

    // Price range
    const prices = cars.map((car) => car.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearAllFilters = () => {
        const clearedFilters = {
            brand: '',
            type: '',
            transmission: '',
            fuel: '',
            minPrice: '',
            maxPrice: '',
            location: '',
        };
        setLocalFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    const FilterSection = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {title}
            </h3>
            {children}
        </div>
    );

    const SelectFilter = ({ label, value, onChange, options, placeholder }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );

    const PriceRangeFilter = () => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Price Range (per day)
            </label>
            <div className="grid grid-cols-2 gap-2">
                <input
                    type="number"
                    placeholder={`Min ($${minPrice})`}
                    value={localFilters.minPrice}
                    onChange={(e) =>
                        handleFilterChange('minPrice', e.target.value)
                    }
                    min={minPrice}
                    max={maxPrice}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                    type="number"
                    placeholder={`Max ($${maxPrice})`}
                    value={localFilters.maxPrice}
                    onChange={(e) =>
                        handleFilterChange('maxPrice', e.target.value)
                    }
                    min={minPrice}
                    max={maxPrice}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>
            <div className="mt-2 text-xs text-gray-500">
                Range: ${minPrice} - ${maxPrice}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-primary-600 hover:text-primary-800">
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                </Button>
            </div>

            <div className="space-y-6">
                <FilterSection title="Vehicle Type">
                    <SelectFilter
                        label="Car Type"
                        value={localFilters.type}
                        onChange={(value) => handleFilterChange('type', value)}
                        options={types}
                        placeholder="Any type"
                    />
                </FilterSection>

                <FilterSection title="Brand">
                    <SelectFilter
                        label="Brand"
                        value={localFilters.brand}
                        onChange={(value) => handleFilterChange('brand', value)}
                        options={brands}
                        placeholder="Any brand"
                    />
                </FilterSection>

                <FilterSection title="Specifications">
                    <SelectFilter
                        label="Transmission"
                        value={localFilters.transmission}
                        onChange={(value) =>
                            handleFilterChange('transmission', value)
                        }
                        options={transmissions}
                        placeholder="Any transmission"
                    />

                    <SelectFilter
                        label="Fuel Type"
                        value={localFilters.fuel}
                        onChange={(value) => handleFilterChange('fuel', value)}
                        options={fuels}
                        placeholder="Any fuel type"
                    />
                </FilterSection>

                <FilterSection title="Location">
                    <SelectFilter
                        label="Pickup Location"
                        value={localFilters.location}
                        onChange={(value) =>
                            handleFilterChange('location', value)
                        }
                        options={locations}
                        placeholder="Any location"
                    />
                </FilterSection>

                <FilterSection title="Price">
                    <PriceRangeFilter />
                </FilterSection>
            </div>

            {/* Active Filters Summary */}
            {Object.values(localFilters).some((v) => v) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Active Filters:
                    </h4>
                    <div className="space-y-1">
                        {Object.entries(localFilters).map(
                            ([key, value]) =>
                                value && (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1')}:
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {value}
                                        </span>
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CarFilters;
