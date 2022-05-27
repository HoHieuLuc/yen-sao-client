const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
});

module.exports = {
    images: {
        domains: ['res.cloudinary.com', 'media.discordapp.net'],
        deviceSizes: [576, 768, 992, 1200, 1400]
    },
}