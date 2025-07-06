// src/appwriteConfig.ts
import { Client, Account, Databases } from "appwrite";

const client: Client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account: Account = new Account(client);
const databases: Databases = new Databases(client);

// Environment variables for database and collection IDs
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export { client, account, databases, DATABASE_ID, COLLECTION_ID };
