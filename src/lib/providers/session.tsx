import { Session } from "@/_types";
import { RefreshToken } from "@/services/api/request";
import { createContext, useEffect, useState } from "react";

interface Context {
    session: Session | false,
    loading: boolean
}

export const SessionContext = createContext<Context>({
    session: false,
    loading: false
});

const SessionProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const [session, handleSession] = useState<Session | false>(false);
    const [loading, handleLoading] = useState<boolean>(true);

    async function fetchSession() {
        const access_token = localStorage.getItem('access_token');

        if (!access_token) {
            RefreshToken().then(async res => {
                console.log("Refreshing token")
                
                if(res) return await fetchSession();
            });
        }

        fetch(`/api/user?access_token=${ access_token }`).then(async res => {
            if(res.status === 200) {
                const data = await res.json();

                console.log("Session has been stored: " + JSON.stringify(data));

                return handleSession(data);
            }

            if(res.status === 401) return RefreshToken().then(async res => {
                console.log("Refreshing token")
                
                if(res) return await fetchSession();
            })
        })
    }

    useEffect(() => {
        handleLoading(true);

        fetchSession().finally(() => handleLoading(false));
    }, [])

    return <SessionContext.Provider
        value={{
            session, 
            loading
        }}
    >
        { children }
    </SessionContext.Provider>
}

export default SessionProvider;