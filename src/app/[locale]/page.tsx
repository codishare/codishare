import { useTranslations } from 'next-intl';
import {Link} from '../../navigation'; 

export default function Index() {
    const t = useTranslations('Dashboard');

    return <div className='text-red-500'>  
        <Link href='/auth/sign-up'>
            { t('sign-up') }
        </Link>
    </div>
}