import { userAgent } from "next/server";
import prisma from "@/lib/prisma";
import { DeviceType } from "@prisma/client"; 

export function getClientIp(req: Request) {
    let clientIp = req.headers.get("x-forwarded-for") || null;

    if (clientIp && clientIp.includes("::ffff:"))
        return clientIp.split("::ffff:")[1];

    return null;
}

export async function performUserAgent(req: Request, userId: number) {
    const ip = getClientIp(req);
    const { ua, device, browser, os } = userAgent(req);

    const isRegisteredAgent = await prisma.device.findFirst({
        where: {
            ip: ip as string,
        },
    });

    if (!isRegisteredAgent) {
        await prisma.device.create({
            data: {
                userId,
                ip: ip as string,
                agent: ua,
                model: device.model,
                device: (device.type?.toUpperCase() as DeviceType) || "UNKNOWN",
                browser: browser.name,
                os: os.name,
            },
        });
    }
}

export function extractAccessToken(req: Request) {
    return req.headers.get("authorization")?.split(" ")[1];
}