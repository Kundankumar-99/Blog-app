const conf = {
  appwrite_URL: string(import.meta.env.VITE_APPWRITE_URL),
  appwrite_PROJECT_ID: string(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwrite_DATABASE_ID: string(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwrite_COLLECTION_ID: string(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwrite_BUCKET_ID: string(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;