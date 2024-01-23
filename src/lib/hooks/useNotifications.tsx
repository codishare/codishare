import { useContext } from "react";
import { NotificationContext } from "../providers/notifications";

export function useNotifications() {
    return useContext(NotificationContext); 
}