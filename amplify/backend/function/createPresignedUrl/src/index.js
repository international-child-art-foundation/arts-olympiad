/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_S369DBA687_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const client = new S3Client();

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const fileName = event.arguments.fileName;
  const userId = event.identity.claims.sub;
  const uuid = uuidv4();

  const Bucket = process.env.STORAGE_S369DBA687_BUCKETNAME;
  const Key = "public/original/" + uuid + fileName;
  const Expires = 900; //15 min
  const Fields = {
    "x-amz-meta-user-id": userId,
    "x-amz-meta-file-name": fileName,
  };
  const Conditions = [
    ["starts-with", "$key", Key],
    ["content-length-range", 0, 1024 * 1024 * 5],
    ["eq", "$x-amz-meta-user-id", userId],
    ["eq", "$x-amz-meta-file-name", fileName],
  ];

  const { url, fields } = await createPresignedPost(client, {
    Bucket,
    Key,
    Expires,
    Conditions,
    Fields,
  });

  return { url, fields };
};
