/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_PATH: process.env.API_URL,
  },
}

module.exports = nextConfig
