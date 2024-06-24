/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
const nextConfig = {};
const withPWAV = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});
export default withPWAV(nextConfig);
