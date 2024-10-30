import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  storage;
  constructor() {
    this.Client.setEndpoint(conf.appwrite_URL).setProject(
      conf.appwrite_PROJECT_ID
    );
    this.databases = new Databases(this.Client);
    this.storage = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredimage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite_DATABASE_ID,
        conf.appwrite_COLLECTION_ID,
        slug,
        {
          title,
          slug,
          content,
          featuredimage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwrite_DATABASE_ID,
        conf.appwrite_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite_DATABASE_ID,
        conf.appwrite_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwrite_DATABASE_ID,
        conf.appwrite_COLLECTION_ID,
        slug
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwrite_DATABASE_ID,
        conf.appwrite_COLLECTION_ID,
        queries
      );
    } catch (error) {
      throw error;
      return false;
    }
  }


  //File Upload Services

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwrite_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwrite_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }


  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwrite_BUCKET_ID, fileId);

  }



}

const service = new Service();

export default service;
