import { Device, Session } from "@/_types"
import { useSession } from "@/lib/hooks/useSession";

export default function Devices() {
    const {
        session
    } : {
        session: Session | false; 
    } = useSession();

    return <section className="w-full">
        
    </section>
}