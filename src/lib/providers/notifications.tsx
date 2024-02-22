import { createContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; 

export const NotificationContext = createContext<(notification: Notification) => void>(() => {});

interface Notification {
    id?: number,
    icon?: React.ReactNode, 
    type?: "INFO" | "SUCCESS" | "WARNING" | "ERROR", 
    message: string
}

const NotificationProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const [notifications, handleNotifications] = useState<Notification[]>([]);

    const addNotification = (notification: Notification) => {
        const identifier = Date.now();

        handleNotifications((prevNotifications) => [
            ...prevNotifications,
            {
                ...notification,
                id: identifier,
            },
        ]);
        
        setTimeout(() => {
            handleNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== identifier)
            );
        }, 5000);
    }

    return <NotificationContext.Provider
        value={ addNotification }
    >
        { children }

        {/* @ Notifications */}
        <section className="fixed bottom-0 right-0 p-5 flex flex-col gap-3 items-end w-[90%] md:max-w-[350px]">
            <AnimatePresence>
                {
                    notifications.map((notification: Notification, index: number) => {
                        return <motion.div
                            className="bg-white border notification cursor-pointer px-5 py-3.5 rounded-lg text-sm flex gap-5 select-none items-center dark:bg-black/30 dark:border-gray-600"
                            key={ index }
                            initial={{ opacity: 0, y: 50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        >
                            {
                                notification.icon && <div
                                    className={
                                        notification.type == "INFO" ? "text-blue-500" :
                                        notification.type == "SUCCESS" ? "text-green-500" :
                                        notification.type == "WARNING" ? "text-yellow-500" :
                                        notification.type == "ERROR" ? "text-red-500" : ""
                                    }
                                >
                                    { notification.icon }
                                </div>
                            }

                            <p className="notification-content">
                                { notification.message }
                            </p>
                        </motion.div>
                    })
                }
            </AnimatePresence>
        </section>
    </NotificationContext.Provider>
}

export default NotificationProvider;