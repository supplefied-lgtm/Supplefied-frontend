/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '*.ngrok-free.dev',
    '*.ngrok-free.app',
    '*.ngrok.app',
    '*.ngrok.io',
    'shrubs-overhang-ventricle.ngrok-free.dev',
    'localhost:3000',
  ],
};

export default nextConfig;
