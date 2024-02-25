'use client'

import Devices from "@/components/layouts/preferences/elements/devices/devices";
import Selector from "@/components/layouts/preferences/elements/selector";
import { Fragment } from "react";

export default function Page() {
    return <Fragment>
        <Selector
            route="/preferences/devices"
        />

        <Devices />
    </Fragment>
}