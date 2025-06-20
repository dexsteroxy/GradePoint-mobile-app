import nodemailer from 'nodemailer';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from '../emailTemplates/emailTemplates.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    
    const mailOptions = {
      from: `"Result Tracker" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Email Verification',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken)
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};


export const sendWelcomeEmail = async (email, username) => {
  try {
    console.log(`Attempting to send welcome email to ${email}`);
    
    const template = WELCOME_EMAIL_TEMPLATE
      .replace(/{username}/g, username)
      .replace(/{dashboardURL}/g, process.env.FRONTEND_URL || 'https://your-app.com')
      .replace(/{helpCenterURL}/g, process.env.HELP_URL || 'https://your-app.com/help');

    const mailOptions = {
      from: `"Result Tracker" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Result Tracker!',
      html: template,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High'
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Full email sending error:', error);
    throw error; // Re-throw to be caught by the caller
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: `"Result Tracker" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High'
      }
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};


export const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: `"Result Tracker" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High'
      }
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset success email:', error);
    return false;
  }
};