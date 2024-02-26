import { NextRequest } from "next/server";
import { extractAccessToken } from "../services/api/request"; 
import { jwtVerify } from "jose";
import { getJwtSecretKey } from "../jwt-secret";
import { getCookie } from "cookies-next";

export default async function isAuthorized(req: NextRequest, useRefreshToken: boolean = false) {
    try {
        let token: any = extractAccessToken(req);

        if(useRefreshToken) token = getCookie("refresh-token", { req });

        if (!token) return false
        
        try {
            const isValid = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));

            if(!isValid) return false

            return true
        } catch (error) { 
            return false
        } 
    } catch (error) {
        return false
    }
}