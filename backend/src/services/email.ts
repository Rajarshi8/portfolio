import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

/**
 * Send contact form email notification
 */
export const sendContactEmail = async (data: ContactEmailData): Promise<void> => {
  const { name, email, subject, message } = data;

  // Check if email is configured (reject obvious placeholder values)
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const isPlaceholder = (v?: string) =>
    !v || v.startsWith('your-') || v === 'your-app-password';
  if (isPlaceholder(smtpUser) || isPlaceholder(smtpPass)) {
    logger.warn('SMTP credentials not configured - skipping email send');
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO || process.env.SMTP_USER,
    replyTo: email,
    subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
    text: `
New contact form submission:

Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #6244C5; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .message-box { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="field">
        <span class="label">Subject:</span> ${subject || 'N/A'}
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Contact email sent successfully to ${process.env.EMAIL_TO}`);
  } catch (error) {
    logger.error('Failed to send contact email:', error);
    throw error;
  }
};
