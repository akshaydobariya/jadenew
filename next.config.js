/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['zscroll.peclick.com', 'api.jadescrolls.com'],
//     },
// }

// module.exports = nextConfig

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    }
}

module.exports = nextConfig