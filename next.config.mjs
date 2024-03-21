/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plazavea.vteximg.com.br",
        port: "",
      },
      {
        protocol: "https",
        hostname: "metroio.vtexassets.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s7d2.scene7.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tofuu.getjusto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname:
          "e39a9f00db6c5bc097f9-75bc5dce1d64f93372e7c97ed35869cb.ssl.cf1.rackcdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "falabella.scene7.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
