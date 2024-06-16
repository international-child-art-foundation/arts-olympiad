/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import sharp from "sharp";

const s3Client = new S3Client();

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  
  const bucket = `artsolympiadf677eab9a54848dc8788ee9110a11839185846-${process.env.ENV}`;
  const userId = event.user_id;

  let srcKey;
  try {
    const data = await s3Client.send(new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: userId
    }));

    if (data.Contents.length != 1) {
      const error = data.Contents.length ? "Image already processed." : "Image not found.";
      console.log(error)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error })
      }
    }

    srcKey = data.Contents[0].Key;
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error })
    }
  }
  
  const getCommand = new GetObjectCommand({ Bucket: bucket, Key: srcKey });
  let contentBuffer;
  let metaData;
  try {
    const response = await s3Client.send(getCommand);
    console.log(response);
    console.log(response.Metadata);
    metaData = response.Metadata;
    console.log(metaData);
    const stream = response.Body;
  
    if (stream instanceof Readable) {
      contentBuffer = Buffer.concat(await stream.toArray());
    } else {
      throw new Error("Unknown object stream type");
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error })
    };
  }

  const widthByName = {
    'medium': 800,
    'thumb': 400
  }

  for (const [name, width] of Object.entries(widthByName)) {
    const dstKey = `${userId}/${name}.webp`;
    let outputBuffer;
    try {
      outputBuffer = await sharp(contentBuffer).resize(width).toFormat("webp").toBuffer();
    } catch (error) {
      console.log("Error processing image with sharp.", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error })
      };
    }

    const putCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: dstKey,
      Body: outputBuffer,
      ContentType: "image/webp",
      Metadata: metaData,
    });

    try {
      await s3Client.send(putCommand);
      console.log(`Image successfully processed and uploaded: ${dstKey}`);
    } catch (error) {
      console.log("Error uploading processed image to S3:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error })
      }
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success processing image.' })
  };
};