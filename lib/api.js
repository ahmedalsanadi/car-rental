// Mock API for Car Rental System
import { format, addDays, isAfter, isBefore } from 'date-fns';

// Mock data
const cars = [
    {
        id: 1,
        name: 'BMW X5',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        type: 'SUV',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 5,
        price: 120,
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Bluetooth',
            'Backup Camera',
            'Leather Seats',
            'Sunroof',
        ],
        description:
        'Experience luxury and performance with this premium BMW X5. Featuring advanced safety systems, premium leather interior, and cutting-edge technology. Perfect for family trips or business travel with exceptional comfort and reliability.',
        rating: 4.8,
        reviews: 126,
        available: true,
        location: 'Downtown',
        mileage: '25 MPG',
    },
    {
        id: 2,
        name: 'Mercedes-Benz C-Class',
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2023,
        type: 'Sedan',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 5,
        price: 95,
        images: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Bluetooth',
            'Heated Seats',
            'Premium Audio',
            'Lane Assist',
            'Parking Sensors',
            'Keyless Entry',
            'Climate Control'
        ],
        description:
        'Elegant and comfortable Mercedes-Benz C-Class perfect for city driving and long journeys. Features sophisticated design, advanced safety technologies, and premium comfort amenities for an exceptional driving experience.',
        rating: 4.7,
        reviews: 89,
        available: true,
        location: 'Airport',
        mileage: '28 MPG',
    },
    {
        id: 3,
        name: 'Audi A4',
        brand: 'Audi',
        model: 'A4',
        year: 2023,
        type: 'Sedan',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 5,
        price: 85,
        images: [
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Bluetooth',
            'Backup Camera',
            'Heated Seats',
            'Virtual Cockpit',
            'LED Headlights',
            'Sport Mode',
            'Wireless Charging'
        ],
        description:
            'Sophisticated Audi A4 with cutting-edge technology and superior comfort. Features the innovative Virtual Cockpit, premium materials, and dynamic performance for both business and leisure travel.',
        rating: 4.6,
        reviews: 73,
        available: true,
        location: 'Downtown',
        mileage: '30 MPG',
    },
    {
        id: 4,
        name: 'Toyota Camry',
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        type: 'Sedan',
        transmission: 'Automatic',
        fuel: 'Hybrid',
        seats: 5,
        price: 65,
        images: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation', 
            'Bluetooth', 
            'Backup Camera', 
            'Eco Mode',
            'Hybrid System',
            'Toyota Safety Sense',
            'Smartphone Integration',
            'Dual-Zone Climate'
        ],
        description:
            'Reliable and fuel-efficient Toyota Camry Hybrid, perfect for everyday use. Advanced hybrid technology delivers exceptional fuel economy while maintaining comfort and performance for all your transportation needs.',
        rating: 4.5,
        reviews: 94,
        available: true,
        location: 'Suburban',
        mileage: '45 MPG',
    },
    {
        id: 5,
        name: 'Ford Mustang',
        brand: 'Ford',
        model: 'Mustang',
        year: 2023,
        type: 'Coupe',
        transmission: 'Manual',
        fuel: 'Gasoline',
        seats: 4,
        price: 110,
        images: [
            'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Bluetooth',
            'Sport Mode',
            'Premium Audio',
        ],
        description:
        'Iconic Ford Mustang with powerful performance and classic American muscle car appeal. Features aggressive styling, track-ready performance, and modern technology for the ultimate driving experience.',
        rating: 4.7,
        reviews: 156,
        available: true,
        location: 'Downtown',
        mileage: '22 MPG',
    },
    {
        id: 6,
        name: 'Honda CR-V',
        brand: 'Honda',
        model: 'CR-V',
        year: 2023,
        type: 'SUV',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 5,
        price: 75,
        images: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Bluetooth',
            'Backup Camera',
            'All-Wheel Drive',
        ],
        description:
        'Versatile Honda CR-V SUV with excellent safety ratings and spacious interior. Perfect for families with advanced safety features, ample cargo space, and reliable performance in all weather conditions.',
        rating: 4.6,
        reviews: 112,
        available: true,
        location: 'Airport',
        mileage: '32 MPG',
    },
    {
        id: 7,
        name: 'Tesla Model 3',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        type: 'Sedan',
        transmission: 'Automatic',
        fuel: 'Electric',
        seats: 5,
        price: 100,
        images: [
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'Autopilot',
            'Supercharging',
            'Premium Audio',
            'Glass Roof',
            'Over-the-Air Updates',
            'Mobile Connector',
            'Sentry Mode',
            'Dog Mode'
        ],
        description:
        'Revolutionary Tesla Model 3 with advanced autopilot and zero emissions. Features cutting-edge electric technology, minimalist interior design, and industry-leading software capabilities.',
        rating: 4.8,
        reviews: 203,
        available: true,
        location: 'Tech District',
        mileage: '130 MPGe',
    },
    {
        id: 8,
        name: 'Jeep Wrangler',
        brand: 'Jeep',
        model: 'Wrangler',
        year: 2023,
        type: 'SUV',
        transmission: 'Manual',
        fuel: 'Gasoline',
        seats: 5,
        price: 90,
        images: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
        ],
        features: ['4WD', 'Removable Doors', 'Off-Road Capable', 'Bluetooth'],
        description:
        'Adventure-ready Jeep Wrangler perfect for off-road exploration and outdoor activities. Features legendary 4x4 capability, removable doors and roof, and rugged design for any terrain.',
        rating: 4.5,
        reviews: 87,
        available: true,
        location: 'Adventure Hub',
        mileage: '24 MPG',
    },    {
        id: 9,
        name: 'Porsche 911',
        brand: 'Porsche',
        model: '911',
        year: 2023,
        type: 'Coupe',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 4,
        price: 250,
        images: [
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Premium Audio',
            'Sport Chrono Package',
            'Adaptive Suspension',
            'Sport Exhaust',
            'Carbon Fiber Interior',
            'Track Mode',
            'Launch Control'
        ],
        description:
            'Legendary Porsche 911 delivering unmatched performance and luxury. Features precision engineering, iconic design, and track-proven performance for the ultimate sports car experience.',
        rating: 4.9,
        reviews: 78,
        available: true,
        location: 'Luxury District',
        mileage: '20 MPG',
    },
    {
        id: 10,
        name: 'Range Rover Evoque',
        brand: 'Land Rover',
        model: 'Range Rover Evoque',
        year: 2023,
        type: 'SUV',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 5,
        price: 140,
        images: [
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Terrain Response',
            'Meridian Audio',
            'Panoramic Roof',
            'All-Wheel Drive',
            'Adaptive Cruise Control',
            'Wade Sensing',
            'ClearSight Rear View'
        ],
        description:
            'Sophisticated Range Rover Evoque combining luxury with capability. Features distinctive design, premium materials, and advanced all-terrain technology for urban luxury and off-road adventures.',
        rating: 4.7,
        reviews: 92,
        available: true,
        location: 'Luxury District',
        mileage: '26 MPG',
    },
    {
        id: 11,
        name: 'Chevrolet Corvette',
        brand: 'Chevrolet',
        model: 'Corvette',
        year: 2023,
        type: 'Coupe',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 2,
        price: 200,
        images: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Bose Audio',
            'Performance Data Recorder',
            'Magnetic Ride Control',
            'Head-Up Display',
            'Competition Sport Seats',
            'Z51 Performance Package',
            'Electronic LSD'
        ],
        description:
            'American icon Chevrolet Corvette with mid-engine design and supercar performance. Features revolutionary engineering, aggressive styling, and track-ready capabilities for pure driving excitement.',
        rating: 4.8,
        reviews: 134,
        available: true,
        location: 'Sports Car Hub',
        mileage: '19 MPG',
    },
    {
        id: 12,
        name: 'Volvo XC90',
        brand: 'Volvo',
        model: 'XC90',
        year: 2023,
        type: 'SUV',
        transmission: 'Automatic',
        fuel: 'Hybrid',
        seats: 7,
        price: 130,
        images: [         
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
        ],
        features: [
            'GPS Navigation',
            'Pilot Assist',
            'Bowers & Wilkins Audio',
            'Air Suspension',
            'Seven Seats',
            'City Safety',
            'Clean Zone',
            'Sensus Connect'
        ],
        description:
            'Scandinavian luxury meets safety in the Volvo XC90. Features award-winning design, advanced safety technology, and premium craftsmanship perfect for families who value safety and luxury.',
        rating: 4.7,
        reviews: 89,
        available: true,
        location: 'Family Hub',
        mileage: '35 MPGe',
    }
];

const customers = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        joinDate: '2023-01-15',
        totalBookings: 5,
        status: 'Active',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Ave, Los Angeles, CA 90210',
        joinDate: '2023-02-20',
        totalBookings: 3,
        status: 'Active',
    },
    {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        phone: '+1 (555) 345-6789',
        address: '789 Elm St, Chicago, IL 60601',
        joinDate: '2023-03-10',
        totalBookings: 7,
        status: 'Active',
    },
];

const bookings = [
    {
        id: 1,
        customerId: 1,
        carId: 1,
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        totalDays: 5,
        pricePerDay: 120,
        totalPrice: 600,
        status: 'Confirmed',
        pickupLocation: 'Downtown',
        dropoffLocation: 'Downtown',
        additionalServices: ['GPS', 'Child Seat'],
        createdAt: '2024-01-10T10:00:00Z',
    },
    {
        id: 2,
        customerId: 2,
        carId: 3,
        startDate: '2024-01-18',
        endDate: '2024-01-22',
        totalDays: 4,
        pricePerDay: 85,
        totalPrice: 340,
        status: 'Active',
        pickupLocation: 'Airport',
        dropoffLocation: 'Airport',
        additionalServices: ['GPS'],
        createdAt: '2024-01-12T14:30:00Z',
    },
    {
        id: 3,
        customerId: 3,
        carId: 5,
        startDate: '2024-01-25',
        endDate: '2024-01-30',
        totalDays: 5,
        pricePerDay: 110,
        totalPrice: 550,
        status: 'Pending',
        pickupLocation: 'Downtown',
        dropoffLocation: 'Downtown',
        additionalServices: [],
        createdAt: '2024-01-20T09:15:00Z',
    },
    {
        id: 4,
        customerId: 4,
        carId: 7,
        startDate: '2024-03-01',
        endDate: '2024-03-05',
        totalDays: 4,
        pricePerDay: 100,
        totalPrice: 400,
        status: 'Confirmed',
        pickupLocation: 'Tech District',
        dropoffLocation: 'Tech District',
        additionalServices: ['Additional Driver'],
        createdAt: '2024-02-24T16:45:00Z',
    },
    {
        id: 5,
        customerId: 5,
        carId: 9,
        startDate: '2024-03-10',
        endDate: '2024-03-12',
        totalDays: 2,
        pricePerDay: 250,
        totalPrice: 500,
        status: 'Pending',
        pickupLocation: 'Luxury District',
        dropoffLocation: 'Luxury District',
        additionalServices: ['GPS', 'Insurance'],
        createdAt: '2024-03-05T11:20:00Z',
    },
];

// Utility function to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API Functions
export const getDashboardData = async () => {
    await delay(500);

    const totalCars = cars.length;
    const availableCars = cars.filter((car) => car.available).length;
    const totalCustomers = customers.length;
    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(
        (booking) => booking.status === 'Active',
    ).length;
    const pendingBookings = bookings.filter(
        (booking) => booking.status === 'Pending',
    ).length;
    const revenue = bookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
    );

    return {
        totalCars,
        availableCars,
        totalCustomers,
        totalBookings,
        activeBookings,
        pendingBookings,
        revenue,
        recentBookings: bookings.slice(0, 5),
    };
};

export const getCars = async (filters = {}) => {
    await delay(300);

    let filteredCars = [...cars];

    // Apply filters
    if (filters.brand) {
        filteredCars = filteredCars.filter((car) =>
            car.brand.toLowerCase().includes(filters.brand.toLowerCase()),
        );
    }

    if (filters.type) {
        filteredCars = filteredCars.filter(
            (car) => car.type.toLowerCase() === filters.type.toLowerCase(),
        );
    }

    if (filters.transmission) {
        filteredCars = filteredCars.filter(
            (car) =>
                car.transmission.toLowerCase() ===
                filters.transmission.toLowerCase(),
        );
    }

    if (filters.fuel) {
        filteredCars = filteredCars.filter(
            (car) => car.fuel.toLowerCase() === filters.fuel.toLowerCase(),
        );
    }

    if (filters.minPrice) {
        filteredCars = filteredCars.filter(
            (car) => car.price >= filters.minPrice,
        );
    }

    if (filters.maxPrice) {
        filteredCars = filteredCars.filter(
            (car) => car.price <= filters.maxPrice,
        );
    }

    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCars = filteredCars.filter(
            (car) =>
                car.name.toLowerCase().includes(searchTerm) ||
                car.brand.toLowerCase().includes(searchTerm) ||
                car.model.toLowerCase().includes(searchTerm),
        );
    }

    // Apply sorting
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price-low':
                filteredCars.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredCars.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredCars.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filteredCars.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
    }

    return filteredCars;
};

export const getCarById = async (id) => {
    await delay(200);
    const car = cars.find((car) => car.id === parseInt(id));
    if (!car) {
        throw new Error('Car not found');
    }
    return car;
};

export const getCustomers = async () => {
    await delay(300);
    return customers;
};

export const getCustomerById = async (id) => {
    await delay(200);
    const customer = customers.find((customer) => customer.id === parseInt(id));
    if (!customer) {
        throw new Error('Customer not found');
    }
    return customer;
};

export const getAllBookings = async () => {
    await delay(300);

    // Enrich bookings with customer and car data
    const enrichedBookings = bookings.map((booking) => {
        const customer = customers.find((c) => c.id === booking.customerId);
        const car = cars.find((c) => c.id === booking.carId);

        return {
            ...booking,
            customer: customer
                ? { name: customer.name, email: customer.email }
                : null,
            car: car
                ? { name: car.name, brand: car.brand, model: car.model }
                : null,
        };
    });

    return enrichedBookings;
};

export const getBookingsByCustomerId = async (customerId) => {
    await delay(200);

    const customerBookings = bookings.filter(
        (booking) => booking.customerId === parseInt(customerId),
    );

    // Enrich with car data
    const enrichedBookings = customerBookings.map((booking) => {
        const car = cars.find((c) => c.id === booking.carId);
        return {
            ...booking,
            car: car
                ? {
                      name: car.name,
                      brand: car.brand,
                      model: car.model,
                      images: car.images,
                  }
                : null,
        };
    });

    return enrichedBookings;
};

export const getBookingById = async (id) => {
    await delay(200);

    const booking = bookings.find((booking) => booking.id === parseInt(id));
    if (!booking) {
        throw new Error('Booking not found');
    }

    // Enrich with customer and car data
    const customer = customers.find((c) => c.id === booking.customerId);
    const car = cars.find((c) => c.id === booking.carId);

    return {
        ...booking,
        customer,
        car,
    };
};

export const createBooking = async (bookingData) => {
    await delay(500);

    const newBooking = {
        id: bookings.length + 1,
        ...bookingData,
        createdAt: new Date().toISOString(),
        status: 'Pending',
    };

    bookings.push(newBooking);
    return newBooking;
};

export const updateBooking = async (id, updates) => {
    await delay(300);

    const bookingIndex = bookings.findIndex(
        (booking) => booking.id === parseInt(id),
    );
    if (bookingIndex === -1) {
        throw new Error('Booking not found');
    }

    bookings[bookingIndex] = { ...bookings[bookingIndex], ...updates };
    return bookings[bookingIndex];
};

export const deleteBooking = async (id) => {
    await delay(300);

    const bookingIndex = bookings.findIndex(
        (booking) => booking.id === parseInt(id),
    );
    if (bookingIndex === -1) {
        throw new Error('Booking not found');
    }

    bookings.splice(bookingIndex, 1);
    return { success: true };
};

export const createCar = async (carData) => {
    await delay(500);

    const newCar = {
        id: cars.length + 1,
        ...carData,
        available: true,
        rating: 0,
        reviews: 0,
    };

    cars.push(newCar);
    return newCar;
};

export const updateCar = async (id, updates) => {
    await delay(300);

    const carIndex = cars.findIndex((car) => car.id === parseInt(id));
    if (carIndex === -1) {
        throw new Error('Car not found');
    }

    cars[carIndex] = { ...cars[carIndex], ...updates };
    return cars[carIndex];
};

export const deleteCar = async (id) => {
    await delay(300);

    const carIndex = cars.findIndex((car) => car.id === parseInt(id));
    if (carIndex === -1) {
        throw new Error('Car not found');
    }

    cars.splice(carIndex, 1);
    return { success: true };
};

// Authentication functions
export const login = async (email, password) => {
    await delay(500);

    // Mock authentication - in real app, verify credentials
    if (email === 'admin@carrental.com' && password === 'admin123') {
        return {
            success: true,
            user: {
                id: 1,
                name: 'Admin User',
                email: 'admin@carrental.com',
                role: 'admin',
            },
            token: 'mock-jwt-token-admin',
        };
    }

    if (email === 'user@email.com' && password === 'user123') {
        return {
            success: true,
            user: {
                id: 2,
                name: 'John Doe',
                email: 'user@email.com',
                role: 'user',
            },
            token: 'mock-jwt-token-user',
        };
    }

    throw new Error('Invalid credentials');
};

export const register = async (userData) => {
    await delay(500);

    // Mock registration
    const newUser = {
        id: customers.length + 1,
        ...userData,
        joinDate: format(new Date(), 'yyyy-MM-dd'),
        totalBookings: 0,
        status: 'Active',
    };

    customers.push(newUser);

    return {
        success: true,
        user: {
            ...newUser,
            role: 'user',
        },
        token: 'mock-jwt-token-new-user',
    };
};

export const getFeaturedCars = async () => {
    await delay(300);
    return cars.filter((car) => car.rating >= 4.6).slice(0, 6);
};

export const getRelatedCars = async (carId, type) => {
    await delay(200);
    return cars
        .filter((car) => car.id !== parseInt(carId) && car.type === type)
        .slice(0, 4);
};
