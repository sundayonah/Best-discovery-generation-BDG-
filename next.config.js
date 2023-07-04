/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  images: {
    //this fix the image not showing
    domains: ['augustin-obi.netlify.app', 'localhost'],
    // domains: ['augustin-obi.netlify.app', '64a327b650d4bf4ce07df652--augustin-obi.netlify.app/'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
}
