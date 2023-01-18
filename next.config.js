/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const apiUrl =
  process.env.NODE_ENV === "production"
    ? " https://vedusone.herokuapp.com/api"
    : "http://localhost:8080/api";

const nextConfig = {
  env: {
    API_URL: apiUrl,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  i18n,
  ...(process.env.NODE_ENV === "production" && {
    typescript: {
      ignoreBuildErrors: true,
    },
  }),
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withPWA];
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig });
};
