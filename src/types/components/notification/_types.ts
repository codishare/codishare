export interface Notification {
    id?: number
    icon?: React.ReactNode
    type: "INFO" | "SUCCESS" | "WARNING" | "ERROR"
    message: string
}