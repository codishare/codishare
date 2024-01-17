import { useTranslations } from 'next-intl';
import {Link} from '../../navigation';
import { ToogleTheme } from '@/components/theme/toogleTheme';

export default function Index() {
    const t = useTranslations('Dashboard');

    return <div className='text-red-500'>
        { t('welcome') }, Developerrr
        <br/>
        <ToogleTheme />
        <br/>
        <Link href='/auth/sign-up'>
            Sign Up
        </Link>
    </div>
}