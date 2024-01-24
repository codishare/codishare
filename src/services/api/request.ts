import { userAgent } from "next/server";
import prisma from "@/lib/prisma";
import { DeviceType } from "@prisma/client";

export function getClientIp(req: Request) {
    let clientIp = req.headers.get("x-forwarded-for") || null; 

    if (clientIp && clientIp.includes('::ffff:')) return clientIp.split('::ffff:')[1];

    return false
}

export async function performUserAgent(req: Request) {
    const ip = getClientIp(req);
    const {
        ua,
        device,
        browser,
        os
    } = userAgent(req); 

    const isRegisteredAgent = await prisma.device.findFirst({
        where: {
            ip: ip as string
        }
    })

    if(!isRegisteredAgent) {
        await prisma.device.create({
            data: {
                ip: ip as string, 
                agent: ua,
                model: device.model,
                device: device.type?.toUpperCase() as DeviceType || "UNKNOWN", 
                browser: browser.name,
                os: os.name
            }
        })
    }
}