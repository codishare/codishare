import { useContext } from "react";
import { SessionContext } from "../providers/session";

export function useSession() {
    return useContext(SessionContext); 
}