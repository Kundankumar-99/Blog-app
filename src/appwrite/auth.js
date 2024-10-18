import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_URL)
      .setProject(conf.appwrite_PROJECT_ID);

    this.account = new Account(this.client);
  }

  async CreateAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async currentUser(){
    try {
        await this.account.get();
    } catch (error) {
        throw error;
    }

    return null;
  }

  async logout(){
    try{
        await this.account.deleteSessions();
    }
    catch(error){
        throw error;
    }
  }



}

const authService = new AuthService();

export default authService;
