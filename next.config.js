/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en", "tr", "ro"],
  },
  images: {
    domains: ["res.cloudinary.com","via.placeholder.com"], // ✅ placeholder domaini eklendi
  },
};

module.exports = nextConfig;
