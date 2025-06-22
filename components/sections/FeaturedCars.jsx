'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedCars } from '@/lib/api';
import CarCard from '@/components/common/CarCard';
import Loading from '@/components/layout/Loading';

const FeaturedCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedCars = async () => {
            try {
                const featuredCars = await getFeaturedCars();
                setCars(featuredCars);
            } catch (error) {
                console.error('Error fetching featured cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedCars();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Featured Cars
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <Loading message="Loading featured cars..." />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Featured Cars
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of premium vehicles,
                        each offering exceptional comfort and performance for
                        your journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}>
                            <CarCard car={car} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12">
                    <a
                        href="/cars"
                        className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                        View All Cars
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedCars;
