import { useContext } from "react";
import { SessionContext } from "../providers/session";

export function useSessions() {
    return useContext(SessionContext); 
}