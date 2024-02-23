'use client'

import { Option } from "@/types/components/selector/_types";

export default function Selector({
    label, 
    icon,   
    value, 
    change, 
    name,  
    required,
    options
} : {
    label?: string, 
    icon?: React.ReactNode,  
    value?: any,
    change?: (e: any) => void,  
    name?: string, 
    required?: boolean,
    options?: Option[]
}) {
    return <label className="flex flex-col gap-2 cursor-pointer">
        {
            label && <span className="text-sm text-gray-600 flex items-center gap-1">
                { label } { required && <span className="text-red-500 text-xl">*</span> }
            </span>
        }

        <section
            className="px-4 text-sm py-2.5 flex items-center gap-3 rounded-lg focus:outline-none focus:ring-0 bg-gray-50 dark:bg-black/30 border dark:border-gray-600 transition-all"
        >
            {
                icon && <span className="text-gray-400">
                    { icon }
                </span>
            }

            <select  
                value={ value }
                name={ name }  
                className="bg-transparent focus:outline-none focus:ring-0 flex-1 cursor-pointer"
                onChange={ e => change && change(e.target.value)}
            >
                <option value=""></option>

                {
                    options?.map((option, index) => {
                        return <option 
                            key={ index }
                            value={ option.value }
                        >
                            { option.label }
                        </option>
                    })
                }
            </select>
        </section>
    </label>
}