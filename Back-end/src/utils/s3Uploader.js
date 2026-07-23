import s3Client from "../config/s3.js";
import {
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import path from "path";
import { v4 as uuidv4 } from "uuid";

const allowedFileTypes = [

    "image/jpeg",

    "image/png",

    "image/webp",

    "application/pdf",

];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const getKeyFromUrl = (url) => {

    return decodeURIComponent(

        url.replace(

            `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/`,

            ""

        )

    );

};

export const uploadToS3 = async (
    file,
    folder = "uploads"
) => {

    try {

        if (!file) {

            throw new Error("File is required.");

        }

        if (!allowedFileTypes.includes(file.mimetype)) {

            throw new Error("Invalid file type.");

        }

        if (file.size > MAX_FILE_SIZE) {

            throw new Error("File size exceeds the allowed limit.");

        }

        const extension = path.extname(file.originalname);

        const key = `${folder}/${uuidv4()}${extension}`;

        await s3Client.send(

            new PutObjectCommand({

                Bucket: process.env.AWS_S3_BUCKET,

                Key: key,

                Body: file.buffer,

                ContentType: file.mimetype,

            })

        );

        const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

        return {

            key,

            url,

            contentType: file.mimetype,

            size: file.size,

        };

    } catch (error) {

        console.error("S3 Upload Error:", error);

        throw error;

    }

};

export const deleteFromS3 = async (fileUrl) => {

    try {

        const key = getKeyFromUrl(fileUrl);

        await s3Client.send(

            new DeleteObjectCommand({

                Bucket: process.env.AWS_S3_BUCKET,

                Key: key,

            })

        );

    } catch (error) {

        console.error("S3 Delete Error:", error);

        throw error;

    }

};

export default {

    uploadToS3,

    deleteFromS3,

};