import { Session } from "@/types/auth/_types";
import { RefreshToken } from "@/services/api/request";
import { createContext, useEffect, useState } from "react";
import { Context } from "@/types/auth/_types";

export const SessionContext = createContext<Context>({
    session: false,
    loading: false,
    refetchSession: () => {},
});

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, handleSession] = useState<Session | false>(false);
    const [loading, handleLoading] = useState<boolean>(true);

    async function fetchSession(callback: (res: boolean) => void) {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
            return RefreshToken()
                .then(async (res) => {
                    if (res) await fetchSession(callback);
                })
                .catch((err) => {
                    console.log(err);
                    handleSession(false);
                    callback(false);
                });
        }

        fetch(`/api/user/me`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }).then(async (res) => {
            if (res.status === 200) {
                const data = await res.json();

                handleSession(data);
                callback(true);
            }

            if (res.status === 401)
                if (!localStorage.getItem("access_token"))
                    return handleSession(false);
                else
                    return RefreshToken()
                        .then(async (res) => {
                            if (res) await fetchSession(callback);
                        })
                        .catch((err) => {
                            console.log(err);
                            handleSession(false);
                            callback(false);
                        });
        });
    }

    function refetchSession() {
        fetchSession(() => handleLoading(false));
        console.log("Refetching session");
    }

    useEffect(() => {
        handleLoading(true);
        refetchSession();
    }, []);

    return (
        <SessionContext.Provider
            value={{
                session,
                loading,
                refetchSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;
