import {unstable_setRequestLocale} from 'next-intl/server';

export default function Index({
    params: {
        locale
    }
} : {
    params: {
        locale: string;
    };
}) {
    unstable_setRequestLocale(locale);

    return <div className='text-red-500'>  
        {/* @ Dashboard content */}
    </div>
}