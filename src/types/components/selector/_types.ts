export interface Option {
    label: string,
    value: any
}

export interface Selector {
    label?: string, 
    icon?: React.ReactNode,  
    value?: any,
    change?: (e: any) => void,  
    name?: string, 
    required?: boolean,
    options?: Option[],
    defaultValue?: any
}