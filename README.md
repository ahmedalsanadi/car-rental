# 🚗 RentCar - Premium Car Rental Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-007ACC?style=for-the-badge&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-0055FF?style=for-the-badge&logo=framer)

**Experience the freedom of the road with our premium car rental service. Wide selection of vehicles, competitive prices, and exceptional service.**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **🔍 Advanced Car Search** - Filter by brand, type, transmission, fuel, price range, and location
- **📅 Smart Booking System** - Multi-step booking process with date/time selection
- **👤 User Authentication** - Secure login/register with role-based access (Customer/Admin)
- **💳 Payment Integration** - Secure payment processing with price breakdown
- **📱 Responsive Design** - Mobile-first approach with beautiful UI/UX

### 🎨 User Experience
- **🎭 Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **🎨 Modern UI Components** - Shadcn/ui components with custom styling
- **🌙 Dark Mode Ready** - Built with dark mode support
- **⚡ Performance Optimized** - Next.js 15 with Turbopack for blazing fast development
- **📊 Real-time Updates** - Live booking status and availability updates

### 🛠️ Admin Features
- **📊 Dashboard Analytics** - Comprehensive overview with charts and statistics
- **🚗 Fleet Management** - Add, edit, and manage vehicle inventory
- **📋 Booking Management** - View and manage all customer bookings
- **👥 Customer Management** - Customer profiles and booking history
- **📈 Revenue Tracking** - Financial reports and analytics

### 🚀 Technical Excellence
- **⚡ Next.js 15** - Latest features with App Router and Server Components
- **🎯 TypeScript** - Full type safety and better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework with custom design system
- **🔧 Shadcn/ui** - Beautiful, accessible, and customizable components
- **📱 Progressive Web App** - PWA capabilities for mobile experience

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.3.4 (App Router)
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3 + CSS Variables
- **Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion 10.16.4
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + Custom Hooks

### UI/UX Libraries
- **Icons**: Lucide React
- **Date Picker**: React Day Picker
- **Carousel**: Embla Carousel
- **Charts**: Recharts
- **Notifications**: React Hot Toast + Sonner
- **Themes**: Next Themes

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint + Next.js config
- **Build Tool**: Turbopack (Next.js 15)
- **Type Checking**: TypeScript
- **Code Formatting**: Prettier (via ESLint)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm 9.0 or later

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedalsanadi/car-rental.git
   cd car-rental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
car-rental/
├── app/                          # Next.js 15 App Router
│   ├── admin/                    # Admin dashboard pages
│   ├── about/                    # About us page
│   ├── booking/                  # Booking flow pages
│   ├── cars/                     # Car listing and detail pages
│   ├── contact/                  # Contact us page
│   ├── dashboard/                # User dashboard pages
│   ├── login/                    # Authentication pages
│   ├── register/                 # Registration pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.jsx                 # Home page
├── components/                   # Reusable components
│   ├── booking/                 # Booking-related components
│   ├── cars/                    # Car-related components
│   ├── common/                  # Shared components
│   ├── layout/                  # Layout components
│   ├── sections/                # Page sections
│   └── ui/                      # Shadcn/ui components
├── hooks/                       # Custom React hooks
│   ├── useAuth.js              # Authentication hook
│   └── use-toast.ts            # Toast notifications
├── lib/                         # Utility libraries
│   ├── api.js                  # Mock API functions
│   ├── utils.js                # Utility functions
│   └── utils.ts                # TypeScript utilities
├── public/                      # Static assets
└── config files...             # Configuration files
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust and reliability
- **Secondary**: Gray (#64748B) - Professional and clean
- **Accent**: Amber (#F59E0B) - Energy and excitement
- **Success**: Green (#10B981) - Positive actions
- **Error**: Red (#EF4444) - Errors and warnings

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Scale**: Responsive typography with Tailwind's scale

### Components
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Cards**: Consistent card design with shadows and hover effects
- **Forms**: Accessible form components with validation
- **Navigation**: Responsive navigation with mobile menu
- **Modals**: Overlay components for dialogs and confirmations

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication
NEXT_PUBLIC_AUTH_SECRET=your-secret-key

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended animations
- Custom utilities
- Responsive breakpoints

### Shadcn/ui Setup
Components are configured via `components.json`:
- Style: Default
- TypeScript support
- CSS variables for theming
- Custom aliases for imports

---

## 📱 Pages & Features

### 🏠 Home Page
- **Hero Section**: Animated hero with search functionality
- **Featured Cars**: Showcase of premium vehicles
- **Services**: Highlighted services and benefits
- **How It Works**: Step-by-step rental process
- **Testimonials**: Customer reviews and ratings

### 🚗 Cars Page
- **Advanced Filtering**: Multiple filter options
- **Search**: Real-time search functionality
- **Grid/List View**: Toggle between view modes
- **Pagination**: Efficient data loading
- **Sorting**: Price, rating, and name sorting

### 📅 Booking Flow
- **Step 1**: Date and location selection
- **Step 2**: Personal information
- **Step 3**: Payment processing
- **Step 4**: Booking confirmation

### 👤 User Dashboard
- **Overview**: Booking statistics and recent activity
- **My Bookings**: Complete booking history
- **Profile Settings**: Account management

### 🔧 Admin Dashboard
- **Analytics**: Revenue, bookings, and customer metrics
- **Fleet Management**: Vehicle inventory control
- **Booking Management**: Customer booking oversight
- **Customer Management**: User account administration

---

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed
- Follow the existing code style

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Shadcn/ui** - Beautiful component library
- **Framer Motion** - Amazing animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Team** - Incredible React framework
- **Radix UI** - Accessible component primitives

---

## 📞 Support

- **Email**: ahmedalsanadi40@gmail.com
- **Documentation**: [docs.rentcar.com](#)
- **Issues**: [GitHub Issues](#)

---

<div align="center">

**Made with ❤️ by the Ahmed Al-Sanadi**

[⭐ Star this repo](#) • [🔄 Follow us](#) • [📧 Contact](#)

</div>
