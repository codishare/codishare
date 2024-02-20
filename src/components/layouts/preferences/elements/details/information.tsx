import Selector from "@/components/ui/selector";
import TextInput from "@/components/ui/text-input";
import { AutoGraphOutlined, CodeOutlined } from "@mui/icons-material";

export default function Information() {
    return <div className="w-full flex flex-col py-7">
        <h3 className="text-lg font-bold">
            Account
        </h3>

        <small className="text-gray-400 dark:text-zinc-400 mb-7">
            Update your basic account information
        </small>

        <div className="w-full border h-24 mb-7 rounded bg-gray-100 dark:bg-zinc-900 dark:border-zinc-900">

        </div>
        
        <div className="flex gap-4 flex-wrap items-end">
            <div className="flex-1">
                <TextInput
                    label="Name"
                    type="text"
                    name="name" 
                    className="py-3"
                    required={ true }
                    placeholder="e.g Xavier Morell" 
                />
            </div>

            <div className="flex-1">
                <TextInput
                    label="Alias"
                    type="text"
                    name="alias" 
                    className="py-3"
                    placeholder="e.g xavier-morell"
                />
            </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 items-end">
            <div className="flex-1">
                <Selector 
                    label="Stack"
                    icon={ <CodeOutlined /> } 
                    required={ true }
                    name="stack"
                    options={[
                        { label: "Frontend", value: "FRONTEND" },
                        { label: "Backend", value: "BACKEND" },
                        { label: "Fullstack", value: "FULLSTACK" },
                    ]}
                />
            </div>

            <div className="flex-1">
                <Selector 
                    label="Role"
                    required={ true }
                    icon={ <AutoGraphOutlined /> } 
                    name="role"
                    options={[
                        { label: "Trainee", value: "TRAINEE" },
                        { label: "Junior", value: "JUNIOR" },
                        { label: "Mid", value: "MID" },
                        { label: "Senior", value: "SENIOR" },
                    ]} 
                />
            </div>
        </div>

        <button className="self-end bg-indigo-500 w-full md:w-auto text-white dark:text-zinc-950 mt-7 px-5 py-2 rounded">
            Save changes
        </button>
    </div>
}