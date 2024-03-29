"use client";

import { Session } from "@/_types";
import Navigator from "@/components/layouts/navigator";
// import Spinner from "@/components/ui/spinner/component";
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
        <main className="w-screen h-screen flex flex-col gap-3">
            <Navigator />

            {children}
        </main>
    );
}
