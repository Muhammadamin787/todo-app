
// // appwriteHelper.js

// import * as Appwrite from 'node-appwrite';

// const client = new Appwrite.Client();
// client.setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)); // Your AppWrite API endpoint
// client.setProject(String(process.env.NEXT_PUBLIC_PROJECT_ID)); // Your AppWrite project ID
// client.setKey(String(process.env.NEXT_PUBLIC_API_KEY)); // Your AppWrite API key

// const users = new Appwrite.Users(client); // Instantiate the Users service
// const account = new Appwrite.Account(client);

// const appwriteHelper = {
//      getClient: () => client,
//      getUserDetails: async (userId: string) => {
//           try {
//                const userDetails = await users.get(userId);
//                return userDetails;
//           } catch (error) {
//                console.error('Error fetching user details:', error);
//                throw error;
//           }
//      },

//      // Add other helper functions for interacting with AppWrite here
// };

// export default appwriteHelper;