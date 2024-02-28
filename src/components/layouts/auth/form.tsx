'use client'

import Button from "@/components/ui/buttons/button";
import Github from "@/components/ui/buttons/github";
import Google from "@/components/ui/buttons/google"; 
import Input from "@/components/ui/input";
import Label from "@/components/ui/label"; 
import { authorize } from "@/actions/auth";
import { cn } from "@/lib/cn";
import { Link } from "@/navigation"; 
import { Fragment } from "react";  

export default function AuthForm({
    extend = false
} : {
    extend: boolean
}) {
    const authorizeCredentials = authorize.bind(null, extend)

    return <section className="flex flex-col gap-3 mt-5"> 
        <Github />

        <Google /> 

        <div className="flex mt-4 items-center gap-3">
            <hr className="flex-1" />

            <span className="text-gray-600 text-sm text-center">
                Or continue with
            </span>

            <hr className="flex-1" />
        </div>

        <form 
            className="flex flex-col gap-3"
            action={ authorizeCredentials }
        >
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

            {/* @ Forgot password on sign in */}
            {
                !extend && <Link
                    href="#"
                    className="text-gray-500 hover:text-indigo-500 text-xs mt-4 text-right transition-all"
                >
                    Forgot Password?
                </Link>
            }

            {/* @ Confirm password on sign up */}
            {
                extend && <Label
                    label="Confirm Password"
                    htmlFor="confirm_password"
                    required
                >
                    <Input name="confirm_password" placeholder="Confirm Password" type="password" />
                </Label>
            }

            <Link
                href={ extend ? "/auth/signin" : "/auth/signup"}
                className={ cn('text-gray-500 hover:text-indigo-500 text-xs text-right transition-all', extend && 'mt-4') }
            >
                {
                    extend ? <Fragment>
                        Already have an account? <span className="text-indigo-500">Sign In</span>
                    </Fragment> : <Fragment>
                        Don't have an account? <span className="text-indigo-500">Sign Up</span>
                    </Fragment>
                }
            </Link>

            <Button
                type="submit" 
            > 
                Submit
            </Button>
        </form>
    </section>
}