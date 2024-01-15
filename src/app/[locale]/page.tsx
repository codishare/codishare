import { useTranslations } from 'next-intl';

export default function Page() {
    const t = useTranslations('Dashboard');

    return <div className='text-red-500'>
        { t('welcome') }, Developerrr
    </div>
}