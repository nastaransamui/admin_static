/** @type {import('next').NextConfig} */
// Tell Next.js these files will be read at runtime by the below code:
const path = require('path');
path.resolve('./public/');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
