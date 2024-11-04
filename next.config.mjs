/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          { hostname: "avatar.vercel.sh", port: "", protocol: "https" },
          { hostname: "utfs.io", port: "", protocol: "https" },
          {
            hostname: "avatars.githubusercontent.com",
            port: "",
            protocol: "https",
          },
          {
            hostname: "*.googleusercontent.com",
            port: "",
            protocol: "https",
            pathname: "**",
          },
        ],
      },
};

export default nextConfig;
