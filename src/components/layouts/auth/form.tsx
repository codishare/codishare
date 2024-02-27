import Button from "@/components/ui/buttons/button";
import Github from "@/components/ui/buttons/github";
import Google from "@/components/ui/buttons/google"; 
import Input from "@/components/ui/input";
import Label from "@/components/ui/label"; 
import { Link } from "@/navigation";

export default function AuthForm({
    extend
} : {
    extend?: boolean
}) {
    return <section className="flex flex-col gap-3 mt-5"> 
        <form className="flex flex-col gap-3">
            <Label
                label="Email"
                htmlFor="email"
                required
            >
                <Input name="email" placeholder="Email" />
            </Label>

            <Label
                label="Password"
                htmlFor="password"
                required
            >
                <Input name="password" placeholder="Password" type="password" />
            </Label>

            <Link
                href="#"
                className="text-gray-500 hover:text-indigo-500 text-xs mt-4 text-right transition-all"
            >
                Forgot Password?
            </Link>

            <Button> 
                { extend ? "Sign Up" : "Sign In" }
            </Button>
        </form>

        <div className="flex py-5 items-center gap-3">
            <hr className="flex-1" />

            <span className="text-gray-600 text-sm text-center">
                Or continue with
            </span>

            <hr className="flex-1" />
        </div>

        <Github />

        <Google />
    </section>
}