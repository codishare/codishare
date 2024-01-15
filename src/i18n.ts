import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';
import { allowedLanguages } from "./settings";
 
export default getRequestConfig(async ({ locale }) => {  
    if (!allowedLanguages.includes(locale as any)) notFound();
    
    return {
        messages: (await import(`../messages/${ locale }.json`)).default
    };
});