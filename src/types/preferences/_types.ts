export interface PreferencesForm {
    name?: string,
    alias?: string,
    stack?: string,
    role?: string,
    icon?: File,
    banner?: File
}

export interface View {
    label: string; 
    route: string
}