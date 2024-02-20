"use client";

import { Session } from "@/_types";
import Navigator from "@/components/layouts/navigator"; 
import { useSession } from "@/lib/hooks/useSession";
import { useRouter } from "@/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const {
        session,
        loading,
    }: {
        session: Session | false;
        loading: boolean;
    } = useSession();
    const router = useRouter();

    if (!session && !loading) {
        return router.push("/auth/login");
    }

    return (
        <main className="w-screen min-h-screen bg-gray-100 flex flex-col gap-3">
            <Navigator />

            {children}
        </main>
    );
}
