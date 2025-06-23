/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for better performance
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },

    // Image optimization
    images: {
        domains: ['images.pexels.com', 'images.unsplash.com'],
        formats: ['image/webp', 'image/avif'],
    },

    // ESLint configuration
    eslint: {
        ignoreDuringBuilds: true,
    },

    // TypeScript configuration
    typescript: {
        ignoreBuildErrors: false,
    },

    // Compiler options
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Headers for better security and performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },

    // Redirects for better SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;