'use client';

import React from 'react';
import {
    Car,
    Gauge,
    Fuel,
    Settings,
    Users,
    Calendar,
    MapPin,
    Shield,
    Zap,
    Wrench,
} from 'lucide-react';

const CarSpecs = ({ car }) => {
    const specifications = [
        {
            category: 'Basic Information',
            icon: Car,
            specs: [
                { label: 'Make', value: car.brand },
                { label: 'Model', value: car.model },
                { label: 'Year', value: car.year },
                { label: 'Type', value: car.type },
                {
                    label: 'Color',
                    value: car.color || 'Available in multiple colors',
                },
            ],
        },
        {
            category: 'Performance',
            icon: Gauge,
            specs: [
                { label: 'Engine', value: car.engine || '2.0L Turbocharged' },
                { label: 'Horsepower', value: car.horsepower || '250 HP' },
                { label: 'Torque', value: car.torque || '295 lb-ft' },
                { label: 'Top Speed', value: car.topSpeed || '155 mph' },
                { label: '0-60 mph', value: car.acceleration || '6.2 seconds' },
            ],
        },
        {
            category: 'Fuel & Efficiency',
            icon: Fuel,
            specs: [
                { label: 'Fuel Type', value: car.fuel },
                { label: 'Fuel Economy', value: car.mileage },
                {
                    label: 'Tank Capacity',
                    value: car.tankCapacity || '18.5 gallons',
                },
                { label: 'Range', value: car.range || '450 miles' },
                {
                    label: 'Emissions',
                    value: car.emissions || 'Euro 6 compliant',
                },
            ],
        },
        {
            category: 'Drivetrain',
            icon: Settings,
            specs: [
                { label: 'Transmission', value: car.transmission },
                {
                    label: 'Drive Type',
                    value: car.driveType || 'Front-wheel drive',
                },
                { label: 'Gears', value: car.gears || '8-speed automatic' },
            ],
        },
        {
            category: 'Dimensions & Capacity',
            icon: Users,
            specs: [
                { label: 'Seating Capacity', value: `${car.seats} passengers` },
                { label: 'Doors', value: car.doors || '4 doors' },
                { label: 'Cargo Space', value: car.cargoSpace || '15.1 cu ft' },
                { label: 'Length', value: car.length || '185.2 inches' },
                { label: 'Width', value: car.width || '72.2 inches' },
                { label: 'Height', value: car.height || '57.1 inches' },
                { label: 'Wheelbase', value: car.wheelbase || '110.2 inches' },
                { label: 'Curb Weight', value: car.weight || '3,450 lbs' },
            ],
        },
        {
            category: 'Safety & Security',
            icon: Shield,
            specs: [
                {
                    label: 'Safety Rating',
                    value: car.safetyRating || '5-Star NHTSA',
                },
                { label: 'Airbags', value: car.airbags || '8 airbags' },
                { label: 'ABS', value: 'Anti-lock Braking System' },
                { label: 'ESC', value: 'Electronic Stability Control' },
                { label: 'Traction Control', value: 'Yes' },
                { label: 'Parking Sensors', value: 'Front & Rear' },
            ],
        },
    ];

    const SpecSection = ({ category, icon: Icon, specs }) => (
        <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                    {category}
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">
                            {spec.label}
                        </span>
                        <span className="text-gray-900 font-semibold">
                            {spec.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
                <Wrench className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                    Technical Specifications
                </h2>
            </div>

            {specifications.map((section, index) => (
                <SpecSection
                    key={index}
                    category={section.category}
                    icon={section.icon}
                    specs={section.specs}
                />
            ))}

            {/* Additional Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">
                            i
                        </span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-2">
                            Important Notes
                        </h4>
                        <ul className="text-blue-800 text-sm space-y-1">
                            <li>
                                • All specifications are approximate and may
                                vary by trim level
                            </li>
                            <li>• Fuel economy figures are EPA estimates</li>
                            <li>
                                • Vehicle features may vary based on
                                availability
                            </li>
                            <li>
                                • Please verify specific features with our
                                rental team
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarSpecs;
