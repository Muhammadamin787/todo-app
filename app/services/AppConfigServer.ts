import { Client, Databases } from "node-appwrite";

class AppwriteSDK {
    readonly client = new Client();
    readonly databases;

    constructor() {
        this.client.setEndpoint(String(process.env.ENDPOINT));
        this.client.setProject(String(process.env.PROJECT_ID));
        this.databases = new Databases(this.client);
        // this.client.setKey(String(process.env.API_KEY));
    }

}

const appwriteSDK = new AppwriteSDK();
export default appwriteSDK;
