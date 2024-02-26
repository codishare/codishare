import createIntlMiddleware from 'next-intl/middleware';

export const locales = ["en", "es"];

const handleLocaleRouting = createIntlMiddleware({
    locales, 
    defaultLocale: "en",
})

export default handleLocaleRouting;
