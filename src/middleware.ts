import createMiddleware from 'next-intl/middleware';
import { allowedLanguages, defaultLanguage } from './settings';
 
export default createMiddleware({ 
    locales: allowedLanguages,
    defaultLocale: defaultLanguage
});
 
export const config = { 
    matcher: ['/', `/(${ allowedLanguages.join('|') })/:path*`]
};