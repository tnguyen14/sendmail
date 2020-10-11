require("dotenv").config();
const nodemailer = require("nodemailer");
const nl2br = require("nl2br");
const htmlToText = require("nodemailer-html-to-text").htmlToText;
const logger = require("pino")();

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
transporter.use("compile", htmlToText());

module.exports = async function (content, opts) {
  const options = {
    from: process.env.MAIL_USER,
    html: nl2br(content),
    ...opts,
  };

  if (process.env.NODE_ENV != "production") {
    logger.info("Not sending email if not in production");
    logger.info(options);
    return;
  }
  const sendmailInfo = await transporter.sendMail(options);
  logger.debug(sendmailInfo);
  return sendmailInfo;
};
