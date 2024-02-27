import Github from "@/components/layouts/auth/github";

export default async function Page() {
    return <main className="flex items-center p-5 gap-5">
        Login

        <Github />
    </main>
}