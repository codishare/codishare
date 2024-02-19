import { ErrorOutlineRounded, LocationOnOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react"

export default function Location({
    ip
} : {
    ip?: string
}) {
    const [location, handleLocation] = useState<{
        city: string;
        regionName: string;
    } | null | "ERROR">(null);

    useEffect(() => {
        fetch(`http://ip-api.com/json/${ ip }`)
            .then(response => response.json())
            .then(data => {
                if(data && data.status == "success") {
                    handleLocation(data)
                }

                if(data && data.status == "fail") {
                    handleLocation("ERROR")
                }
            })
            .catch(error => console.error(error))
    }, [ip])

    if(!location) return "Geofetching..."

    if(location == "ERROR") return <section className="flex text-sm w-full md:w-auto text-orange-500 rounded-full items-center gap-3">
        <ErrorOutlineRounded className="text-sm" />

        <p>
            Unable to fetch location
        </p>
    </section>

    return <section className="flex text-sm w-full md:w-auto text-indigo-500 rounded-full items-center gap-3">
        <LocationOnOutlined className="text-sm" />

        <p>
            { location.city }, { location.regionName }
        </p>
    </section>
}