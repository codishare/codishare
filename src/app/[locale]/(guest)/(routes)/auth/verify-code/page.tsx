import Form from "@/components/auth/verify-code/form";

export default async function Page({
    params: { locale },
}: {
    params: {
        locale: string;
    };
}) {
    return (
        <div className="w-[400px] flex flex-col gap-2">
            <h1 className="mt-5 font-extrabold text-gray-700 dark:text-white text-4xl">
                Codi
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-500">
                    Share
                </span>
            </h1>

            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Enter the code you received in your email
            </p>

            <Form />
        </div>
    );
}
