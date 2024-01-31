import createMiddleware from "next-intl/middleware";
export const locales = ["en", "es"];

const LocaleMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: "en",
});

export default LocaleMiddleware;