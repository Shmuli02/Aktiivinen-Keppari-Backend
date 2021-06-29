const nodemailer = require("nodemailer");
const emailRouter = require('express').Router()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
 });
 transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
 });

emailRouter.post('/', function (request, response) {
  let mailOptions = {
    from: "Aktiivinen Keppari",
    to: `${request.body.email}`,
    subject: `Message from: ${request.body.email}`,
    text: `${request.body.message}`,
  };
 
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      response.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      response.json({
        status: "success",
      });
    }
  });
 });
 

module.exports = emailRouter
