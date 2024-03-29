import { userAgent } from "next/server";
import prisma from "@/lib/prisma";
import { DeviceType } from "@prisma/client";
import { useRouter } from "@/navigation";

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

export async function RefreshToken() {
    return new Promise((resolve, reject) => {
        fetch("/api/auth/refresh-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const data = await res.json();

                if (res.status == 401) {
                    return reject("401 Unauthorized");
                }

                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    return resolve(data.access_token);
                }

                reject();
            })
            .catch((error) => {
                console.error((error as Error).message);

                reject("500");
            });
    });
}
