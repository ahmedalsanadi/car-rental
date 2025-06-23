'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const CarGallery = ({ images, carName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState({});

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1,
        );
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageLoad = (index) => {
        setImageLoaded((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Main Image */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200 overflow-hidden">
                    {!imageLoaded[currentIndex] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="text-gray-400">Loading...</div>
                        </div>
                    )}

                    <img
                        src={images[currentIndex]}
                        alt={`${carName} - Image ${currentIndex + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                            imageLoaded[currentIndex]
                                ? 'opacity-100'
                                : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(currentIndex)}
                    />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Zoom Button */}
                    <button
                        onClick={openModal}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                        <ZoomIn className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </div>

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                    <div className="p-4">
                        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                        index === currentIndex
                                            ? 'border-primary-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <img
                                        src={image}
                                        alt={`${carName} thumbnail ${
                                            index + 1
                                        }`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-6xl max-h-full"
                            onClick={(e) => e.stopPropagation()}>
                            <img
                                src={images[currentIndex]}
                                alt={`${carName} - Full size`}
                                className="max-w-full max-h-full object-contain"
                            />

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            {/* Navigation in Modal */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </>
                            )}

                            {/* Image Counter in Modal */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                                    {currentIndex + 1} of {images.length}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CarGallery;
