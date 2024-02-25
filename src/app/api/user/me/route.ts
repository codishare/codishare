import prisma from "@/lib/prisma";
import { isValidImage, store } from "@/lib/services/api/images";
import { decodeToken, verifyToken } from "@/lib/services/api/jwt";
import { extractAccessToken } from "@/lib/services/api/request";
import { getUserById } from "@/lib/services/api/auth/user";
import validate from "@/lib/services/shared/layouts/preferences";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try { 
        const access_token = extractAccessToken(req); 

        if (!access_token || !(await verifyToken(access_token)))
            return NextResponse.json(
                {
                    message: "invalid_access_token",
                },
                {
                    status: 401,
                }
            );

        const decoded = await decodeToken(access_token);

        if (!decoded || !decoded.userId)
            return NextResponse.json(
                {
                    message: "invalid_access_token",
                },
                {
                    status: 401,
                }
            );

        const { userId } = decoded;

        const user = await getUserById(userId as number);

        if (!user)
            return NextResponse.json(
                {
                    message: "user_not_found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(user, {
            status: 200,
        });
    } catch (error) {
        console.error((error as Error).message);

        return NextResponse.json(
            {
                message: "server_error",
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(req: Request) {
    const access_token = extractAccessToken(req)

    const data = await req.formData();

    if (!access_token || !(await verifyToken(access_token)))
        return NextResponse.json(
            {
                message: "invalid_access_token",
            },
            {
                status: 401,
            }
        );

    const decoded = await decodeToken(access_token);

    if (!decoded || !decoded.userId)
        return NextResponse.json(
            {
                message: "invalid_access_token",
            },
            {
                status: 401,
            }
        );

    const { userId } = decoded;

    const content = Object.fromEntries(data.entries());

    const isValid = validate(content);

    if (isValid !== true)
        return NextResponse.json(
            {
                message: isValid,
            },
            {
                status: 400,
            }
        );

    try {
        let icon, banner; 
        
        if(isValidImage(data.get('icon') as File)) icon = await store(data.get('icon') as File, ['users', `${ userId }`, 'icons']);
        if(isValidImage(data.get('banner') as File)) banner = await store(data.get('banner') as File, ['users', `${ userId }`, 'banners']);

        await prisma.user.update({
            where: {
                id: userId as number,
            },
            data: {
                name: content.name as string,
                alias: content.alias as string,
                icon,
                banner
            }
        });
    } catch (error) {
        console.log((error as Error).message);

        return NextResponse.json(
            {
                message: "server_error",
            },
            {
                status: 500,
            }
        );
    }

    const updatedUser = await getUserById(userId as number);

    return NextResponse.json({
        message: "success",
        user: updatedUser
    }, {
        status: 200
    })
}