import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, differenceInDays } from 'date-fns';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

// Format date
export function formatDate(date, formatString = 'MMM dd, yyyy') {
    if (typeof date === 'string') {
        return format(parseISO(date), formatString);
    }
    return format(date, formatString);
}

// Calculate days between dates
export function calculateDays(startDate, endDate) {
    const start =
        typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return differenceInDays(end, start);
}

// Calculate total price
export function calculateTotalPrice(
    pricePerDay,
    days,
    additionalServices = [],
) {
    const basePrice = pricePerDay * days;
    const servicesPrice = additionalServices.reduce((total, service) => {
        const servicePrices = {
            GPS: 5,
            'Child Seat': 10,
            'Additional Driver': 15,
            Insurance: 20,
            'Wifi Hotspot': 8,
        };
        return total + (servicePrices[service] || 0) * days;
    }, 0);

    return basePrice + servicesPrice;
}

// Validate email
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone
export function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Generate random ID
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Truncate text
export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get initials from name
export function getInitials(name) {
    return name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
}

// Format rating
export function formatRating(rating) {
    return Math.round(rating * 10) / 10;
}

// Get status color
export function getStatusColor(status) {
    const statusColors = {
        Active: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Confirmed: 'bg-blue-100 text-blue-800',
        Completed: 'bg-gray-100 text-gray-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    return statusColors[status] || 'bg-gray-100 text-gray-800';
}

// Convert string to slug
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// Check if date is in the past
export function isPastDate(date) {
    const today = new Date();
    const checkDate = typeof date === 'string' ? parseISO(date) : date;
    return checkDate < today;
}

// Get car type icon
export function getCarTypeIcon(type) {
    const icons = {
        SUV: '🚙',
        Sedan: '🚗',
        Coupe: '🏎️',
        Hatchback: '🚗',
        Convertible: '🏎️',
        Truck: '🚚',
        Van: '🚐',
    };

    return icons[type] || '🚗';
}

// Local storage helpers
export const storage = {
    get: (key) => {
        if (typeof window === 'undefined') return null;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting item from localStorage: ${error}`);
            return null;
        }
    },

    set: (key, value) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item in localStorage: ${error}`);
        }
    },

    remove: (key) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from localStorage: ${error}`);
        }
    },
};
