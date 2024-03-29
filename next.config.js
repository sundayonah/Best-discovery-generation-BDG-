/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
   images: {
      //this fix the image not showing
      domains: [
         "augustin-obi.netlify.app",
         "localhost",
         "best-discovery-generation.netlify.app",
      ],
      // domains: ['augustin-obi.netlify.app', '64a327b650d4bf4ce07df652--augustin-obi.netlify.app/'],
   },
   env: {
      patstack_public_key: process.env.PAYSTACK_PUBLIC_KEY,
   },
}
