import { createContext, useState } from "react";

export const NotificationContext = createContext<(notification: Notification) => void>(() => {});

interface Notification {
    icon?: React.ReactNode, 
    type?: string, 
    message: string
}

const NotificationProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const [notifications, handleNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        handleNotifications([...notifications, notification]);
    }

    return <NotificationContext.Provider
        value={ addNotification }
    >
        { children }

        {/* @ Notifications */}
        <section className="fixed bottom-0 right-0">
            {
                notifications.map((notification: Notification, index: number) => {
                    return <div
                        key={ index }
                    >
                        { notification.message }
                    </div>
                })
            }
        </section>
    </NotificationContext.Provider>
}

export default NotificationProvider;