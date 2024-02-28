import createIntlMiddleware from 'next-intl/middleware';

export const locales = ["en", "es"];

export const defaultLocale = "en";

const handleLocaleRouting = createIntlMiddleware({
    locales, 
    defaultLocale
})

export default handleLocaleRouting;
