import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: 'com.jsm.foodordering',
    databaseId: '6874b688003707f43280',
    bucketId:'6875098c000df60a756a',
    userCollectionId:'6874b6d4000b7ce7aa21',
    categoriesCollectionId:'687504b30020f582639f',
    menuCollectionId:'6875059a0019e6a22789',
    customizationsCollectionId:'6875072a0011f44f9bc4',
    menuCustomizationsCollectionId:'6875085f000823a3faeb',
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account  = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name }: CreateUserParams)=>{
    try{
        const newAccount = await account.create(ID.unique(),email,password,name);

        if(!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { accountId: newAccount.$id, email,name,avatar: avatarUrl }
        );
    } catch(e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({email,password}:SignInParams) =>{
    try{
        const session = await account.createEmailPasswordSession(email,password);
    } catch(e){
        throw new Error(e as string);
    }
}

export const getCurrentUser = async ()=>{
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (e){
        throw new Error(e as string);
    }
}