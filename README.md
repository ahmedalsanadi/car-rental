# 🚗 RentCar - Premium Car Rental Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-007ACC?style=for-the-badge&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-0055FF?style=for-the-badge&logo=framer)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Experience the freedom of the road with our premium car rental service. Wide selection of vehicles, competitive prices, and exceptional service.**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📋 Project Overview

**RentCar** is a modern, full-featured car rental platform built with Next.js 15, React 18, and TypeScript. This project demonstrates advanced web development techniques including:

- **Modern React Patterns**: Hooks, Context API, Custom Hooks
- **Advanced UI/UX**: Framer Motion animations, responsive design, accessibility
- **Type Safety**: Full TypeScript implementation
- **Performance**: Next.js 15 optimizations, image optimization, code splitting
- **Developer Experience**: ESLint, Prettier, modern tooling

### 🎯 Key Features

#### Customer Features
- **🔍 Advanced Car Search & Filtering** - Multi-criteria search with real-time filtering
- **📅 Smart Booking System** - Multi-step booking process with validation
- **👤 User Authentication** - Secure login/register with JWT tokens
- **💳 Payment Processing** - Secure payment with price breakdown
- **📱 Responsive Design** - Mobile-first approach with PWA capabilities
- **🎭 Smooth Animations** - Framer Motion powered micro-interactions

#### Admin Features
- **📊 Analytics Dashboard** - Real-time statistics and charts
- **🚗 Fleet Management** - Complete vehicle inventory management
- **📋 Booking Management** - Customer booking oversight
- **👥 Customer Management** - User profiles and history
- **📈 Revenue Tracking** - Financial analytics and reporting

#### Technical Excellence
- **⚡ Performance Optimized** - Next.js 15 with App Router
- **🔒 Security First** - Input validation, XSS protection, secure headers
- **♿ Accessibility** - WCAG 2.1 compliant components
- **🌐 SEO Optimized** - Meta tags, structured data, sitemap
- **📱 PWA Ready** - Service worker, offline support

---

## 🛠️ Technology Stack

### Core Technologies
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
- **Formatting**: Prettier + Tailwind plugin
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in bundler

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm 9.0 or later

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedalsanadi/car-rental.git
   cd car-rental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript check
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Environment Variables** (Optional)
   Add these in Vercel dashboard:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
   ```

### Other Deployment Options

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📁 Project Structure

```
car-rental/
├── app/                          # Next.js 15 App Router
│   ├── admin/                    # Admin dashboard pages
│   │   └── page.jsx             # Admin overview
│   ├── about/                    # About us page
│   │   └── page.jsx             # Company information
│   ├── booking/                  # Booking flow pages
│   │   └── page.jsx             # Multi-step booking
│   ├── cars/                     # Car listing and detail pages
│   │   ├── page.jsx             # Car catalog
│   │   └── [id]/                # Dynamic car details
│   │       ├── page.jsx         # Car detail page
│   │       └── CarDetailPage.jsx # Car detail component
│   ├── contact/                  # Contact us page
│   │   └── page.jsx             # Contact form and info
│   ├── dashboard/                # User dashboard pages
│   │   └── page.jsx             # User overview
│   ├── login/                    # Authentication pages
│   │   └── page.jsx             # Login form
│   ├── register/                 # Registration pages
│   │   └── page.jsx             # Registration form
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.jsx                 # Home page
├── components/                   # Reusable components
│   ├── booking/                 # Booking-related components
│   │   ├── BookingForm.jsx      # Multi-step booking form
│   │   ├── BookingSummary.jsx   # Booking summary card
│   │   ├── CustomerForm.jsx     # Customer information form
│   │   ├── DatePicker.jsx       # Date selection component
│   │   ├── PaymentForm.jsx      # Payment processing form
│   │   └── PriceBreakdown.jsx   # Price calculation display
│   ├── cars/                    # Car-related components
│   │   ├── CarFilters.jsx       # Search and filter controls
│   │   ├── CarGallery.jsx       # Image gallery component
│   │   ├── CarSpecs.jsx         # Vehicle specifications
│   │   ├── PriceCard.jsx        # Pricing information card
│   │   └── RelatedCars.jsx      # Similar vehicles display
│   ├── common/                  # Shared components
│   │   └── CarCard.jsx          # Vehicle display card
│   ├── layout/                  # Layout components
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Header.jsx           # Navigation header
│   │   └── Loading.jsx          # Loading states
│   ├── sections/                # Page sections
│   │   ├── FeaturedCars.jsx     # Featured vehicles section
│   │   ├── HeroSection.jsx      # Hero banner section
│   │   ├── HowItWorks.jsx       # Process explanation
│   │   ├── ServicesSection.jsx  # Services overview
│   │   └── Testimonials.jsx     # Customer reviews
│   └── ui/                      # Shadcn/ui components
│       ├── button.tsx           # Button component
│       ├── input.tsx            # Input component
│       ├── dialog.tsx           # Modal component
│       └── ...                  # Other UI components
├── hooks/                       # Custom React hooks
│   ├── useAuth.js              # Authentication hook
│   └── use-toast.ts            # Toast notifications
├── lib/                         # Utility libraries
│   ├── api.js                  # Mock API functions
│   ├── utils.js                # Utility functions
│   └── utils.ts                # TypeScript utilities
├── public/                      # Static assets
│   ├── images/                 # Image assets
│   └── ...                     # Other static files
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── components.json             # Shadcn/ui configuration
├── eslint.config.mjs           # ESLint configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust and reliability
- **Secondary**: Gray (#64748B) - Professional and clean
- **Accent**: Amber (#F59E0B) - Energy and excitement
- **Success**: Green (#10B981) - Positive actions
- **Error**: Red (#EF4444) - Errors and warnings
- **Warning**: Yellow (#F59E0B) - Cautions and alerts

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Scale**: Responsive typography with Tailwind's scale
- **Line Heights**: Optimized for readability

### Component Variants
- **Buttons**: Primary, Secondary, Outline, Ghost, Destructive
- **Cards**: Default, Elevated, Interactive
- **Forms**: Input, Textarea, Select, Checkbox, Radio
- **Navigation**: Header, Footer, Breadcrumbs, Pagination
- **Feedback**: Toast, Alert, Progress, Skeleton

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

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended animations
- Custom utilities
- Responsive breakpoints
- Dark mode support

### Shadcn/ui Setup
Components are configured via `components.json`:
- Style: Default
- TypeScript support
- Tailwind CSS integration
- Custom component variants

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design on all devices
- [ ] Form validation and error handling
- [ ] Authentication flow (login/register)
- [ ] Booking process (all steps)
- [ ] Admin dashboard functionality
- [ ] Image loading and optimization
- [ ] Performance and loading states
- [ ] Accessibility (keyboard navigation, screen readers)

### Performance Metrics
- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Optimized with tree shaking
- **Image Optimization**: WebP/AVIF formats with lazy loading

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful, accessible components
- **Framer Motion** for smooth animations
- **Lucide React** for consistent icons
- **Tailwind CSS** for utility-first styling
- **Next.js Team** for the amazing framework

---

## 📞 Support

- **Email**: ahmedalsanadi40@gmail.com
- **Documentation**: [docs.rentcar.com](#)
- **Issues**: [GitHub Issues](#)
- **Discussions**: [GitHub Discussions](#)

---

<div align="center">

**Made with ❤️ by [Ahmed Al-Sanadi]**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmedalsanadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](#)

</div>
