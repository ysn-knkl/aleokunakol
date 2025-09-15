/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en", "tr", "ro"],
    localeDetection: false, // 🔒 EN’e otomatik geçişi kapatır
  },
  images: {
    domains: ["res.cloudinary.com", "via.placeholder.com"],
  },
};

module.exports = nextConfig;