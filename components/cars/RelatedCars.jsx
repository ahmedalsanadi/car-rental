//components/cars/RelatedCars.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CarCard from '@/components/common/CarCard';

const RelatedCars = ({ cars }) => {
  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Similar Cars You Might Like
        </h2>
        <p className="text-gray-600">
          Explore other vehicles in the same category
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col h-full" 
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedCars;