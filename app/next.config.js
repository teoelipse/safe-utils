/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''  // will be either '/safe' or ''
}

module.exports = nextConfig
