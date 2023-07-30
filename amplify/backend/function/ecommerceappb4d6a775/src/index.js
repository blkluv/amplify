/* Amplify Params - DO NOT EDIT
	ANALYTICS_ECOMMERCEAPP_ID
	ANALYTICS_ECOMMERCEAPP_REGION
	API_APIED1054B2_APIID
	API_APIED1054B2_APINAME
	API_ECOMMERCEAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_ECOMMERCEAPP_GRAPHQLAPIIDOUTPUT
	API_ECOMMERCEAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require("aws-sdk");
const nodemailer = require("nodemailer");

// exports.handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   return {
//     statusCode: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*",
//     },
//     body: JSON.stringify("Hello from Lambda!"),
//   };
// };

exports.handler = async (event) => {
  const { senderEmail, senderName, message, date } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    SES: new aws.SES({ region: "ap-south-1", apiVersion: "2010-12-01" }),
  });

  let emailProps = await transporter.sendMail({
    from: senderName,
    to: senderEmail,
    subject: date,
    text: message,
    html: "<div>" + message + "</div>",
  });

  return emailProps;
};
