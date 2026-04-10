/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- This MUST be inside the brackets
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;