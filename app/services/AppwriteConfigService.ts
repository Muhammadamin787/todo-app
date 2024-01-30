/** @format */

import { Account, Client } from "appwrite";

export abstract class AppwriteConfigService {
    readonly client = new Client();
    readonly account;

    constructor() {
        this.client.setEndpoint(String(process.env.ENDPOINT));
        this.client.setProject(String(process.env.PROJECT_ID));
        this.account = new Account(this.client);
    }

    getClient() {
        return this.client;
    }

    getAccount() {
        return this.account;
    }
}
