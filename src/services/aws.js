const AWS = require("aws-sdk");

// Initialize the SDK with AWS credentials
const credentials = new AWS.Credentials({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
});

const s3 = new AWS.S3({
  credentials: credentials,
  region: "YOUR_REGION",
});

// Get the date and sign it
const date = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, "");
const signedDate = AWS.util.crypto
  .hmac("AWS4" + credentials.secretAccessKey, date, "sha256")
  .toString("base64");

// Generate the canonical request
const canonicalRequest = {
  headers: {
    host: "YOUR_BUCKET_NAME.s3.amazonaws.com",
    "x-amz-date": date,
  },
  method: "GET",
  path: "/",
};

// Generate the string to sign
const stringToSign = [
  "AWS4-HMAC-SHA256",
  signedDate,
  signedDate.substr(0, 8) + "/us-east-1/s3/aws4_request",
  AWS.util.crypto.sha256(JSON.stringify(canonicalRequest)).toString("base64"),
].join("\n");

// Generate the signing key
const signingKey = AWS.util.crypto
  .hmac(
    "AWS4" + credentials.secretAccessKey,
    signedDate.substr(0, 8),
    "sha256",
    AWS.util.crypto.hmac(
      "AWS4" + credentials.secretAccessKey,
      signedDate.substr(8, 12),
      "sha256",
      AWS.util.crypto.hmac(
        "AWS4" + credentials.secretAccessKey,
        signedDate.substr(20, 8),
        "sha256",
        "aws4_request"
      )
    )
  )
  .toString("base64");

// Generate the signature
const signature = AWS.util.crypto.hmac(stringToSign, signingKey, "base64");

// Generate the authorization header
const authorization = `AWS4-HMAC-SHA256 Credential=${
  credentials.accessKeyId
}/${signedDate.substr(
  0,
  8
)}/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=${signature}`;

export default authorization;
