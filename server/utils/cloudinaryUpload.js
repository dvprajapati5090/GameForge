import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (

    buffer,

    {

        folder,

        transformation = []

    }

) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {

                folder,

                transformation

            },

            (error, result) => {

                if (error) {

                    return reject(error);

                }

                resolve({

                    url: result.secure_url,

                    publicId: result.public_id

                });

            }

        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);

    });

};

export const deleteFromCloudinary = async (publicId) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);

};