'use client'

import { Session } from "@/_types"; 
import Navigator from "@/components/ui/navigator";
import Spinner from "@/components/ui/spinner/component";
import { useSession } from "@/lib/hooks/useSession"
import { useRouter } from "@/navigation";

export default function Layout({ 
    children 
} : { 
    children: React.ReactNode 
}) {
    const {
        session, 
        loading
    } : {
        session: Session | false, 
        loading: boolean
    } = useSession();

    const router = useRouter();

    if(loading) return <Spinner />
    
    if(!loading && !session) router.push('/auth/login');

    return (
        <main className="w-screen h-screen flex flex-col gap-3">
            <Navigator />

            { children }
        </main>
    )
}