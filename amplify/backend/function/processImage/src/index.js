/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import sharp from "sharp";

const client = new S3Client();

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    
  //Assuming input/output of images and thumbnails are of the same bucket   
  const dstKey = srcKey.replace("public/original/", "public/thumbnail/");
  const supportedTypes = ["jpg", "jpeg", "png", "webp", "tiff", "tif"];
  const width = 200;
    
  
  function getImageType(key) {
    const match = key.match(/\.(jpg|jpeg|png|webp|tiff|tif)$/i);
    return match ? match[1].toLowerCase() : null;
  }
  
  const imageType = getImageType(srcKey);
  
  if (!imageType || !supportedTypes.includes(imageType)) {
    console.log(`Error with image type ${imageType}`);
  }
  
  const getCommand = new GetObjectCommand({ Bucket: srcBucket, Key: srcKey });
  
  let contentBuffer;
  let metaData;
  try {
    const response = await client.send(getCommand);
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
    return;
  }
  
  let outputBuffer;
  try {
    outputBuffer = await sharp(contentBuffer).resize(width).toFormat("webp").toBuffer();
  } catch (error) {
    console.log("Error processing image with sharp", error);
    return;
  }
    
  // change file extension to .webp
  const newDstKey = dstKey.replace(/\.\w+$/, ".webp");
    
  const putCommand = new PutObjectCommand({
    Bucket: srcBucket,
    Key: newDstKey,
    Body: outputBuffer,
    ContentType: "image/webp",
    Metadata: metaData,
  });
  
  try {
    await client.send(putCommand);
    console.log(`Image successfully processed and uploaded: ${newDstKey}`);
  } catch (error) {
    console.log("Error uploading processed image to S3:", error);
  }
};