import Github from "@/components/ui/buttons/github";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
    params: { locale }
} : {
    params: {
        locale: string
    }
}) {
    unstable_setRequestLocale(locale);

    return <main className="flex items-center p-5 gap-5">
        Login

        <Github />
    </main>
}