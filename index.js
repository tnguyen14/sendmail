require("dotenv").config();
const nodemailer = require("nodemailer");
const nl2br = require("nl2br");
const logger = require("pino")();

const transporter = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = async function (content, opts) {
  const options = {
    text: content,
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
