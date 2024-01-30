/** @format */

import {
    AuthProvierValues,
    ISignInPayload,
    ISignUpPayload
} from "@/utils/types";
import { ID, Models, AppwriteException } from "appwrite";
import { AppwriteConfigService } from "./AppwriteConfigService";
import { pageURLs, BASE_URL } from "@/utils/constans";
import { toast } from "@/components/shadcn/ui";

class AppwriteAuthService extends AppwriteConfigService {

}

const appAuthService = new AppwriteAuthService();
export default appAuthService;
