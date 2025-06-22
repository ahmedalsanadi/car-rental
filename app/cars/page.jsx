'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { getCars } from '@/lib/api';
import CarCard from '@/components/common/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import Loading from '@/components/layout/Loading';
import { Button } from '@/components/ui/button';

// Separate component that uses useSearchParams
const CarsPageContent = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        brand: '',
        type: '',
        transmission: '',
        fuel: '',
        minPrice: '',
        maxPrice: '',
        location: '',
    });

    const searchParams = useSearchParams();
    const carsPerPage = 12;

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const allCars = await getCars();
                setCars(allCars);
                setFilteredCars(allCars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Initialize filters from URL params
    useEffect(() => {
        const urlFilters = {};
        searchParams.forEach((value, key) => {
            if (key in filters) {
                urlFilters[key] = value;
            }
        });

        if (Object.keys(urlFilters).length > 0) {
            setFilters((prev) => ({ ...prev, ...urlFilters }));
        }

        const search = searchParams.get('search');
        if (search) {
            setSearchTerm(search);
        }
    }, [searchParams]);

    // Apply filters and search
    useEffect(() => {
        let filtered = [...cars];

        // Apply search
        if (searchTerm) {
            filtered = filtered.filter(
                (car) =>
                    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.brand
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    car.model.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                switch (key) {
                    case 'brand':
                        filtered = filtered.filter(
                            (car) =>
                                car.brand.toLowerCase() === value.toLowerCase(),
                        );
                        break;
                    case 'type':
                        filtered = filtered.filter(
                            (car) =>
                                car.type.toLowerCase() === value.toLowerCase(),
                        );
                        break;
                    case 'transmission':
                        filtered = filtered.filter(
                            (car) =>
                                car.transmission.toLowerCase() ===
                                value.toLowerCase(),
                        );
                        break;
                    case 'fuel':
                        filtered = filtered.filter(
                            (car) =>
                                car.fuel.toLowerCase() === value.toLowerCase(),
                        );
                        break;
                    case 'location':
                        filtered = filtered.filter(
                            (car) =>
                                car.location.toLowerCase() ===
                                value.toLowerCase(),
                        );
                        break;
                    case 'minPrice':
                        filtered = filtered.filter(
                            (car) => car.price >= parseInt(value),
                        );
                        break;
                    case 'maxPrice':
                        filtered = filtered.filter(
                            (car) => car.price <= parseInt(value),
                        );
                        break;
                }
            }
        });

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

        setFilteredCars(filtered);
        setCurrentPage(1);
    }, [cars, searchTerm, filters, sortBy]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
        setFilters({
            brand: '',
            type: '',
            transmission: '',
            fuel: '',
            minPrice: '',
            maxPrice: '',
            location: '',
        });
        setSearchTerm('');
    };

    // Pagination
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = startIndex + carsPerPage;
    const currentCars = filteredCars.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return <Loading message="Loading our amazing fleet..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Fleet
                    </h1>
                    <p className="text-lg text-gray-600">
                        Choose from our extensive collection of premium vehicles
                    </p>
                </motion.div>

                {/* Search and Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search cars, brands, models..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center space-x-4">
                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                <option value="name">Sort by Name</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="rating">Highest Rated</option>
                            </select>

                            {/* View Mode */}
                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${
                                        viewMode === 'grid'
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-white text-gray-600'
                                    }`}>
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${
                                        viewMode === 'list'
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-white text-gray-600'
                                    }`}>
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Filter Toggle */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2">
                                <SlidersHorizontal className="w-4 h-4" />
                                <span>Filters</span>
                            </Button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(Object.values(filters).some((v) => v) || searchTerm) && (
                        <div className="mt-4 flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                                Active filters:
                            </span>
                            {searchTerm && (
                                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                    Search: {searchTerm}
                                </span>
                            )}
                            {Object.entries(filters).map(
                                ([key, value]) =>
                                    value && (
                                        <span
                                            key={key}
                                            className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                                            {key}: {value}
                                        </span>
                                    ),
                            )}
                            <button
                                onClick={clearFilters}
                                className="text-sm text-primary-600 hover:text-primary-800 underline">
                                Clear all
                            </button>
                        </div>
                    )}
                </motion.div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="w-80 flex-shrink-0">
                            <CarFilters
                                filters={filters}
                                onFiltersChange={handleFilterChange}
                                cars={cars}
                            />
                        </motion.div>
                    )}

                    {/* Cars Grid/List */}
                    <div className="flex-1">
                        {/* Results Count */}
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Showing {startIndex + 1}-
                                {Math.min(endIndex, filteredCars.length)} of{' '}
                                {filteredCars.length} cars
                            </p>
                        </div>

                        {/* Cars Display */}
                        {currentCars.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                        : 'space-y-6'
                                }>
                                {currentCars.map((car, index) => (
                                    <motion.div
                                        key={car.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}>
                                        <CarCard
                                            car={car}
                                            viewMode={viewMode}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12">
                                <div className="text-6xl mb-4">🚗</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No cars found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your search criteria or
                                    filters
                                </p>
                                <Button onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </motion.div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-12 flex justify-center">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                                        Previous
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    handlePageChange(page)
                                                }
                                                className={`px-4 py-2 rounded-lg ${
                                                    currentPage === page
                                                        ? 'bg-primary-500 text-white'
                                                        : 'border border-gray-300 hover:bg-gray-50'
                                                }`}>
                                                {page}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                                        Next
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component with Suspense boundary
const CarsPage = () => {
    return (
        <Suspense fallback={<Loading message="Loading cars..." />}>
            <CarsPageContent />
        </Suspense>
    );
};

export default CarsPage;
