'use client'

export default function Checkbox({
    label, 
    name, 
    value, 
    change,
    required
} : {
    label: string
    name?: string
    value?: boolean
    change?: (e: any) => void,
    required?: boolean
}) {
    return <label className="flex items-center text-sm text-gray-600">
        <input 
            type="checkbox"
            className="w-4 h-4 mr-4 transition-all text-indigo-600 accent-indigo-500 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            name={ name }
            checked={ value }
            onChange={ e => change && change(e.target.checked) }
        />

        { label } { required && <span className="text-red-500 text-xl ml-2">*</span> }
    </label>
}