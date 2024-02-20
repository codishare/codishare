import Information from "./information"; 
import Privacy from "./privacy";
import Theme from "./theme";

export default function Details() {
    return <section className="w-full bg-white py-5 px-7 flex flex-col divide-y border rounded">
        <Information />
        
        <Privacy />
        
        <Theme />
    </section>
}