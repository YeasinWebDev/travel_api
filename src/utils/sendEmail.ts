import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import AppError from "../errorHelpers/AppError";

const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  secure: true,
  port: Number(process.env.SMTP_PORT!),
  host: process.env.SMTP_HOST!,
});

interface SendMailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, unknown>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

console.log(process.env.SMTP_USER , process.env.SMTP_PASS, process.env.SMTP_PORT, process.env.SMTP_HOST);

export const sendEmail = async ({ to, subject, templateName, templateData, attachments }: SendMailOptions) => {
  try {
    const templetpath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = (await ejs.renderFile(templetpath, templateData)) as string;
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM!,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });

    console.log(`\u2709\uFE0F Email sent to ${to}: ${info?.messageId}`);
  } catch (error) {
    console.log("error", error);
    throw new AppError("Email error", 400);
  }
};
