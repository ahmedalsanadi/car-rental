//components/sections/HowItWorks.jsx
'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, Car, Key } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search & Compare',
      description: 'Browse our extensive fleet and compare cars based on your preferences, budget, and needs.',
      step: '01',
    },
    {
      icon: Calendar,
      title: 'Select Dates',
      description: 'Choose your pickup and drop-off dates, times, and locations that work best for you.',
      step: '02',
    },
    {
      icon: Car,
      title: 'Book Your Car',
      description: 'Complete your reservation with our secure booking system and receive instant confirmation.',
      step: '03',
    },
    {
      icon: Key,
      title: 'Drive Away',
      description: 'Pick up your keys and hit the road! Our team will ensure your car is ready to go.',
      step: '04',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Renting a car with us is simple and straightforward. 
            Follow these easy steps to get on the road in no time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 z-0" />
                )}

                {/* Step Content */}
                <div className="relative z-10 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {step.step}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-white rounded-xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                5 min
              </div>
              <p className="text-gray-600">Average booking time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                24/7
              </div>
              <p className="text-gray-600">Customer support</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                Free
              </div>
              <p className="text-gray-600">Cancellation policy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;