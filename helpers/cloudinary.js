import {v2 as cloudinary } from "cloudinary";
import fs from  'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        console.log("uploading photo to server : ",localFilePath);
        // console.log("Name of cloudinary : ", process.env.CLOUDINARY_CLOUD_NAME);
        // console.log("API key of cloudinary : ", process.env.CLOUDINARY_CLOUD_API_KEY);
        // console.log("API secret of cloudinary : ", process.env.CLOUDINARY_CLOUD_API_SECRET);
        
        //uploading file to Cloudinary server
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log('Upload successful', res?.url);
        // console.log("File successfully uploaded");

        return res;
    } 
    catch (error) {
        //removing the locally saved temporary file as the upload operation got failed
        console.log("Error in uploading to cloud: ", error); 
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error('Failed to delete local file', err);
            }
        });
    }
}

export {uploadOnCloudinary};