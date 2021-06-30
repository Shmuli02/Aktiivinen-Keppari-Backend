const nodemailer = require("nodemailer");
const emailRouter = require('express').Router()
const config = require('../utils/config')


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.EMAIL,
    pass: config.WORD,
    clientId: config.OAUTH_CLIENTID,
    clientSecret: config.OAUTH_CLIENT_SECRET,
    refreshToken: config.OAUTH_REFRESH_TOKEN,
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
