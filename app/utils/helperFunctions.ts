import appAuthService from "@/services/AppwriteAuthServices";
import Cookies from "js-cookie";

export async function createJWT() {
    try {
        const { jwt } = await appAuthService.account.createJWT();
        Cookies.set("jwt", jwt);
        return jwt;
    } catch (err) {

    }
}

export async function removeJWT() {
    return Cookies.remove("jwt");
}
