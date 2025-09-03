/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en", "tr", "ro"],
  },
  images: {
    domains: ["via.placeholder.com"], // ✅ placeholder domaini eklendi
  },
};

module.exports = nextConfig;
