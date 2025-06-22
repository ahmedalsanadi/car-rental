//components/common/CarCard.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Users, Zap, Fuel, Settings, MapPin, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils.js';

const CarCard = ({ car, viewMode = 'grid' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTransmissionIcon = (transmission) => {
    return transmission === 'Manual' ? Settings : Zap;
  };

  const getFuelIcon = (fuel) => {
    return fuel === 'Electric' ? Zap : Fuel;
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Container */}
          <div className="relative md:w-80 h-48 md:h-auto bg-gray-200 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}
            <img
              src={car.images[0]}
              alt={car.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Like Button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>

            {/* Badge */}
            {car.rating >= 4.7 && (
              <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                Premium
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {car.name}
                </h3>
                <p className="text-gray-600 mb-3">{car.brand} • {car.year}</p>
                
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {car.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({car.reviews} reviews)
                  </span>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {React.createElement(getTransmissionIcon(car.transmission), {
                      className: "w-4 h-4"
                    })}
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {React.createElement(getFuelIcon(car.fuel), {
                      className: "w-4 h-4"
                    })}
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {car.description}
                </p>
              </div>

              <div className="text-right ml-6">
                <div className="text-2xl font-bold text-primary-500 mb-1">
                  {formatCurrency(car.price)}
                </div>
                <div className="text-sm text-gray-600 mb-4">/day</div>
                
                <Link href={`/cars/${car.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-full"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        <img
          src={car.images[0]}
          alt={car.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Badge */}
        {car.rating >= 4.7 && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Premium
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {car.name}
            </h3>
            <p className="text-sm text-gray-600">{car.brand} • {car.year}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {car.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({car.reviews})
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {React.createElement(getTransmissionIcon(car.transmission), {
              className: "w-4 h-4"
            })}
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {React.createElement(getFuelIcon(car.fuel), {
              className: "w-4 h-4"
            })}
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{car.location}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary-500">
              {formatCurrency(car.price)}
            </span>
            <span className="text-sm text-gray-600">/day</span>
          </div>
          <Link href={`/cars/${car.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;