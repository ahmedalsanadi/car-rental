//components/sections/Testimonials.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Business Executive',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
            rating: 5,
            content:
                'Absolutely fantastic service! The BMW X5 I rented was in perfect condition and the booking process was seamless. The staff was professional and accommodating. Will definitely use RentCar again for my business trips.',
        },
        {
            id: 2,
            name: 'Michael Rodriguez',
            role: 'Travel Blogger',
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
            rating: 5,
            content:
                "I've used many car rental services, but RentCar stands out for its exceptional fleet quality and customer service. The Tesla Model 3 was amazing for my road trip across the coast. Highly recommended!",
        },
        {
            id: 3,
            name: 'Emily Chen',
            role: 'Marketing Director',
            avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
            rating: 5,
            content:
                'Great experience from start to finish. The online booking was intuitive, pickup was quick, and the Mercedes C-Class was exactly what I needed for client meetings. Professional service throughout.',
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'Entrepreneur',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
            rating: 5,
            content:
                'Outstanding service and incredible value. The team went above and beyond to accommodate my last-minute booking changes. The Audi A4 was perfect for my business needs. Five stars!',
        },
        {
            id: 5,
            name: 'Lisa Park',
            role: 'Photographer',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
            rating: 5,
            content:
                'Perfect for my photography assignments! The Honda CR-V was spacious enough for all my equipment and the all-wheel drive was great for reaching remote locations. Excellent rental experience.',
        },
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
        );
    };

    const goToTestimonial = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our
                        satisfied customers have to say about their experience
                        with RentCar.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Main Testimonial */}
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-xl">
                                <div className="text-center">
                                    <Quote className="w-12 h-12 text-primary-500 mx-auto mb-6" />

                                    <blockquote className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                                        "{testimonials[currentIndex].content}"
                                    </blockquote>

                                    <div className="flex items-center justify-center space-x-4">
                                        <img
                                            src={
                                                testimonials[currentIndex]
                                                    .avatar
                                            }
                                            alt={
                                                testimonials[currentIndex].name
                                            }
                                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                        />
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 text-lg">
                                                {
                                                    testimonials[currentIndex]
                                                        .name
                                                }
                                            </div>
                                            <div className="text-gray-600">
                                                {
                                                    testimonials[currentIndex]
                                                        .role
                                                }
                                            </div>
                                            <div className="flex items-center mt-1">
                                                {[
                                                    ...Array(
                                                        testimonials[
                                                            currentIndex
                                                        ].rating,
                                                    ),
                                                ].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 text-yellow-400 fill-current"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-10">
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-10">
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                index === currentIndex
                                    ? 'bg-primary-500'
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            98%
                        </div>
                        <p className="text-gray-600">Customer Satisfaction</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            4.9
                        </div>
                        <p className="text-gray-600">Average Rating</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            10K+
                        </div>
                        <p className="text-gray-600">Happy Customers</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
