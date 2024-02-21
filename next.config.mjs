/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "i.ytimg.com" }, { hostname: "via.placeholder.com" }],
  },
  

};


export default nextConfig;