const AWS = require("aws-sdk");

const ACCESS_KEY = "AKIAQL5KLZPDMQFBBHEW";
const SECRET_KEY = "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";
const S3_BUCKET = "ubereatsimages";

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: "us-west-2",
});

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

module.exports = uploadFile;
