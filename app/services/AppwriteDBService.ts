import { Databases, ID, Models } from "appwrite";
import { AppwriteConfigService } from "./AppwriteConfigService";
import { DB } from "@/utils/constans";

class AppwriteDBService extends AppwriteConfigService {
    readonly databases;
    readonly databaseId = DB.id || "";

    constructor() {
        super();
        this.databases = new Databases(this.client);
    }

    async getDocument<T extends Models.Document>(
        collectionId: string | undefined
    ) {
        try {
            if (!collectionId) throw Error("collectionId is not given!");

            const list = await this.databases.listDocuments<T>(
                this.databaseId,
                collectionId
            );
            return list.documents;
        } catch (error) {
            console.error("Error getDocument:", error);
        }
    }

    async createDocument<
        T extends Omit<Models.Document, keyof Models.Document>,
        R extends Models.Document,
    >(collectionId: string | undefined, documentData: T) {
        try {
            if (!collectionId) throw Error("collectionId is not given!");

            const created = await this.databases.createDocument(
                this.databaseId,
                collectionId,
                ID.unique(),
                documentData
            );
            return created as R;
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    async updateDocument<
        T extends Partial<Omit<Document, keyof Models.Document>>,
        R extends Models.Document,
    >(collectionId: string | undefined, documentId: string, documentData: T) {
        try {
            if (!collectionId) throw Error("collectionId is not given!");

            const created = await this.databases.updateDocument(
                this.databaseId,
                collectionId,
                documentId,
                documentData
            );
            return created as R;
        } catch (error) {
            console.error("ERROR UPDATE_DOCUEMTENT:", error);
        }
    }

    async deleteDocument(collectionId: string | undefined, documentId: string) {
        try {
            if (!collectionId) throw Error("collectionId is not given!");
            const deleted = await this.databases.deleteDocument(
                this.databaseId,
                collectionId,
                documentId
            );
            return deleted;
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }
}

const APPWRITE_DB = new AppwriteDBService();
export default APPWRITE_DB;