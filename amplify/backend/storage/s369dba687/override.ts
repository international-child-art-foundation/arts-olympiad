import { AmplifyProjectInfo, AmplifyS3ResourceTemplate } from "@aws-amplify/cli-extensibility-helper";

export function override(resources: AmplifyS3ResourceTemplate, amplifyProjectInfo: AmplifyProjectInfo) {
  resources.s3Bucket.notificationConfiguration = {
    "lambdaConfigurations" : [
      {
        "event": "s3:ObjectCreated:*",
        "filter": {
          "s3Key": {
            "rules": [
              {
                "name": "prefix",
                "value": "public/original/"
              }
            ]
          }
        },
        "function": "arn:aws:lambda:us-east-1:011385746984:function:processImage-staging"
      }
    ]
  };
}