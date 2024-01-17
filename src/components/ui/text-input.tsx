'use client'

export default function TextInput({
    label, 
    icon, 
    type, 
    value, 
    change, 
    placeholder,
    name, 
    disabled,
    required,
} : {
    label?: string, 
    icon?: React.ReactNode, 
    type?: string, 
    value?: any,
    change?: (e: any) => void, 
    placeholder?: string,
    name?: string,
    disabled?: boolean,
    required?: boolean,
}) {
    return <label className="flex flex-col gap-2 mb-3 cursor-pointer">
        {
            label && <span className="text-sm text-gray-600 flex items-center gap-1">
                { label } { required && <span className="text-red-500 text-xl">*</span> }
            </span>
        }

        <section
            className="px-4 text-sm py-2.5 flex items-center gap-3 rounded-lg focus:outline-none focus:ring-0 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 transition-all"
        >
            {
                icon && <span className="text-gray-400">
                    { icon }
                </span>
            }

            <input 
                type={ type || "text" }
                value={ value }
                name={ name }
                placeholder={ placeholder }
                disabled={ disabled || false }
                className="bg-transparent focus:outline-none focus:ring-0 flex-1"
                onChange={ e => change && change(e.target.value)}
            />
        </section>
    </label>
}