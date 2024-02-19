import { Device, Session } from "@/_types"
import { useSession } from "@/lib/hooks/useSession";
import Icon from "./icon";
import Location from "./location";

export default function Devices() {
    const {
        session
    } : {
        session: Session | false; 
    } = useSession();

    if(!session) return; 

    return <section className="w-full bg-white px-7 flex flex-col divide-y border rounded">
        {
            session.devices.map((device: Device) => {
                const {
                    device: device_type,
                    browser, 
                    os, 
                    ip
                } : Device = device;

                return <article 
                    key={ device.id }
                    className="py-5 flex items-center gap-5 flex-wrap"
                >
                    <span className="material-symbols-outlined">
                        {
                            device_type ? <Icon 
                                device_type={ device_type.toString() }
                            /> : 'computer'
                        }
                    </span>

                    <section className="flex-1 flex flex-col gap-1">
                        <h1 className="text-lg">
                            { browser }
                        </h1>

                        <p className="text-xs text-gray-400">
                            { device_type }, { os ? os : 'Unknown OS' }
                        </p>
                    </section>
                    
                    <Location ip={ ip } />
                </article>
            })
        }
    </section>
}