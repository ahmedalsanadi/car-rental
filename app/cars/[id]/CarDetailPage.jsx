'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Star,
    Users,
    Zap,
    Fuel,
    Settings,
    MapPin,
    Calendar,
    Shield,
    Wifi,
    Snowflake,
    Music,
    Navigation,
    Heart,
    Share2,
} from 'lucide-react';
import { getCarById, getRelatedCars } from '@/lib/api';
import { formatCurrency } from '@/lib/utils.js';
import CarGallery from '@/components/cars/CarGallery';
import CarSpecs from '@/components/cars/CarSpecs';
import PriceCard from '@/components/cars/PriceCard';
import RelatedCars from '@/components/cars/RelatedCars';
import Loading from '@/components/layout/Loading';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const CarDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [car, setCar] = useState(null);
    const [relatedCars, setRelatedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                setLoading(true);
                const [carData, related] = await Promise.all([
                    getCarById(id),
                    getCarById(id).then((car) => getRelatedCars(id, car.type)),
                ]);

                setCar(carData);
                setRelatedCars(related);
            } catch (error) {
                console.error('Error fetching car details:', error);
                toast.error('Car not found');
                router.push('/cars');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCarDetails();
        }
    }, [id, router]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: car.name,
                    text: `Check out this ${car.name} for rent!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    const handleBookNow = () => {
        router.push(`/booking?carId=${car.id}`);
    };

    if (loading) {
        return <Loading message="Loading car details..." />;
    }

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Car not found
                    </h2>
                    <Button onClick={() => router.push('/cars')}>
                        Back to Cars
                    </Button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'specifications', label: 'Specifications' },
        { id: 'features', label: 'Features' },
        { id: 'reviews', label: 'Reviews' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Cars</span>
                </motion.button>

                {/* Car Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {car.name}
                            </h1>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <span>
                                    {car.brand} • {car.year}
                                </span>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="font-medium">
                                        {car.rating}
                                    </span>
                                    <span>({car.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{car.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                <Heart
                                    className={`w-5 h-5 ${
                                        isLiked
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-600'
                                    }`}
                                />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-primary-500">
                                    {formatCurrency(car.price)}
                                </div>
                                <div className="text-sm text-gray-600">
                                    per day
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}>
                            <CarGallery
                                images={car.images}
                                carName={car.name}
                            />
                        </motion.div>

                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-lg">
                            {/* Tab Navigation */}
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-6">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                                activeTab === tab.id
                                                    ? 'border-primary-500 text-primary-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                About this car
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {car.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Users className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                                                <div className="font-semibold">
                                                    {car.seats}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Seats
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Settings className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                                                <div className="font-semibold">
                                                    {car.transmission}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Transmission
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Fuel className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                                                <div className="font-semibold">
                                                    {car.fuel}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Fuel Type
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Zap className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                                                <div className="font-semibold">
                                                    {car.mileage}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Mileage
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <CarSpecs car={car} />
                                )}

                                {activeTab === 'features' && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Features & Amenities
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {car.features.map(
                                                (feature, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                            {feature.includes(
                                                                'GPS',
                                                            ) && (
                                                                <Navigation className="w-4 h-4 text-primary-600" />
                                                            )}
                                                            {feature.includes(
                                                                'Bluetooth',
                                                            ) && (
                                                                <Wifi className="w-4 h-4 text-primary-600" />
                                                            )}
                                                            {feature.includes(
                                                                'Air',
                                                            ) && (
                                                                <Snowflake className="w-4 h-4 text-primary-600" />
                                                            )}
                                                            {feature.includes(
                                                                'Audio',
                                                            ) && (
                                                                <Music className="w-4 h-4 text-primary-600" />
                                                            )}
                                                            {!feature.includes(
                                                                'GPS',
                                                            ) &&
                                                                !feature.includes(
                                                                    'Bluetooth',
                                                                ) &&
                                                                !feature.includes(
                                                                    'Air',
                                                                ) &&
                                                                !feature.includes(
                                                                    'Audio',
                                                                ) && (
                                                                    <Shield className="w-4 h-4 text-primary-600" />
                                                                )}
                                                        </div>
                                                        <span className="font-medium text-gray-900">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                Customer Reviews
                                            </h3>
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                                <span className="font-semibold">
                                                    {car.rating}
                                                </span>
                                                <span className="text-gray-600">
                                                    ({car.reviews} reviews)
                                                </span>
                                            </div>
                                        </div>

                                        {/* Sample Reviews */}
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    name: 'John Smith',
                                                    rating: 5,
                                                    date: '2 weeks ago',
                                                    comment:
                                                        'Excellent car! Very clean and comfortable. The booking process was smooth and the staff was professional.',
                                                },
                                                {
                                                    name: 'Sarah Johnson',
                                                    rating: 5,
                                                    date: '1 month ago',
                                                    comment:
                                                        'Perfect for my business trip. The car was in great condition and exactly as described. Highly recommend!',
                                                },
                                                {
                                                    name: 'Mike Wilson',
                                                    rating: 4,
                                                    date: '2 months ago',
                                                    comment:
                                                        'Good experience overall. The car performed well and the pickup/drop-off was convenient.',
                                                },
                                            ].map((review, index) => (
                                                <div
                                                    key={index}
                                                    className="border-b border-gray-200 pb-4 last:border-b-0">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                                <span className="font-semibold text-primary-600">
                                                                    {review.name
                                                                        .split(
                                                                            ' ',
                                                                        )
                                                                        .map(
                                                                            (
                                                                                n,
                                                                            ) =>
                                                                                n[0],
                                                                        )
                                                                        .join(
                                                                            '',
                                                                        )}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900">
                                                                    {
                                                                        review.name
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-600">
                                                                    {
                                                                        review.date
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            {[
                                                                ...Array(
                                                                    review.rating,
                                                                ),
                                                            ].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="w-4 h-4 text-yellow-400 fill-current"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Price Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}>
                            <PriceCard car={car} onBookNow={handleBookNow} />
                        </motion.div>

                        {/* Quick Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Need Help?
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        📞
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            Call us
                                        </div>
                                        <div className="text-sm">
                                            +1 (555) 123-4567
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-600">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        💬
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            Live Chat
                                        </div>
                                        <div className="text-sm">
                                            Available 24/7
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Related Cars */}
                {relatedCars.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16">
                        <RelatedCars cars={relatedCars} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CarDetailPage;
