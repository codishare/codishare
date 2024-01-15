import { createCaller } from "./_trpc/serverClient";

export default async function Page() {
    const caller = createCaller({});
    const result = await caller.greeting();

    return <main>{result}</main>;
}
