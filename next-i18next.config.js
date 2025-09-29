module.exports = {
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en", "tr", "ro"],
  },
  defaultNS: "common",
  fallbackLng: "de",
  returnNull: false,
  react: { useSuspense: false },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};