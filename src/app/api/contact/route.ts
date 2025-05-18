
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Log received data for debugging (especially useful in serverless environments)
    console.log("Received contact form data:", { name, email, subject });

    // Check for essential environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_FORM_EMAIL_TO || !process.env.CONTACT_FORM_EMAIL_FROM) {
      console.error("SMTP configuration environment variables are missing!");
      return NextResponse.json({ success: false, error: "Server configuration error. Please contact support." }, { status: 500 });
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Ensure port is a number
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports (like 587 which uses STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // do not fail on invalid certs if not in production
        rejectUnauthorized: process.env.NODE_ENV === 'production', 
      }
    });

    const websiteName = "PK Singh's Portfolio"; 
    const portfolioUrl = process.env.PORTFOLIO_URL || "https://your-portfolio-url.com";

    // Royal Theme Colors (Hex for email compatibility)
    const royalBackgroundColor = "#0A0F1A"; 
    const royalCardBackgroundColor = "#141A2E"; 
    const royalTextColor = "#F0EAD6"; 
    const royalMutedTextColor = "#A8A29E"; 
    const royalAccentColor = "#FFBF00"; 
    const royalBorderColor = "#2E3A59";

    // 1. Email to Admin
    const adminMailOptions = {
      from: `"${name}" <${process.env.CONTACT_FORM_EMAIL_FROM}>`, // Use a "no-reply" or specific sender address
      replyTo: email,
      to: process.env.CONTACT_FORM_EMAIL_TO,
      subject: `New Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            <style>
                body { margin: 0; padding: 20px; background-color: ${royalBackgroundColor}; color: ${royalTextColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; }
                .container { max-width: 600px; margin: 20px auto; padding: 30px; background-color: ${royalCardBackgroundColor}; border-radius: 12px; border: 1px solid ${royalBorderColor}; box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
                h2 { color: ${royalAccentColor}; margin-top: 0; font-size: 26px; border-bottom: 1px solid ${royalBorderColor}; padding-bottom: 15px; margin-bottom: 25px; font-weight: 600; }
                p { line-height: 1.7; margin-bottom: 18px; font-size: 16px; color: ${royalTextColor}; }
                .label { color: ${royalMutedTextColor}; font-weight: 500; display: block; margin-bottom: 5px; font-size: 14px; }
                .value { margin-bottom: 20px; color: ${royalTextColor}; font-weight: 500; }
                .message-content { white-space: pre-wrap; padding: 20px; background-color: ${royalBackgroundColor}; border-radius: 8px; border: 1px solid ${royalBorderColor}; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 15px; line-height: 1.7; color: ${royalTextColor}; }
                .footer { margin-top: 35px; text-align: center; font-size: 13px; color: ${royalMutedTextColor}; }
                a { color: ${royalAccentColor}; text-decoration: none; font-weight: 500; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2><span style="font-size: 28px;">⚜️</span> New Contact Form Submission</h2>
                <p><span class="label">From:</span> <span class="value">${name}</span></p>
                <p><span class="label">Email:</span> <span class="value"><a href="mailto:${email}">${email}</a></span></p>
                <p><span class="label">Subject:</span> <span class="value">${subject}</span></p>
                <p class="label">Message:</p>
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer"> <p>This email was sent from the contact form on ${websiteName}.</p> </div>
        </body>
        </html>
      `,
    };

    console.log("Attempting to send admin email...");
    await transporter.sendMail(adminMailOptions);
    console.log("Admin email sent successfully.");

    // 2. Thank You Email to User
    const userMailOptions = {
      from: `PK Singh <${process.env.CONTACT_FORM_EMAIL_FROM}>`,
      to: email,
      subject: `Thank you for your message, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You For Your Message!</title>
            <style>
                body { margin: 0; padding: 20px; background-color: ${royalBackgroundColor}; color: ${royalTextColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; }
                .container { max-width: 600px; margin: 20px auto; padding: 30px; background-color: ${royalCardBackgroundColor}; border-radius: 12px; border: 1px solid ${royalBorderColor}; box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
                h2 { color: ${royalAccentColor}; margin-top: 0; font-size: 26px; margin-bottom: 25px; font-weight: 600; }
                p { line-height: 1.7; margin-bottom: 18px; font-size: 16px; color: ${royalTextColor}; }
                strong { color: ${royalAccentColor}; font-weight: 600; }
                .signature { margin-top: 30px; line-height: 1.6; color: ${royalTextColor}; }
                .signature p { margin-bottom: 6px; }
                .footer { margin-top: 35px; text-align: center; font-size: 13px; color: ${royalMutedTextColor}; }
                a { color: ${royalAccentColor}; text-decoration: none; font-weight: 500; }
                a:hover { text-decoration: underline; }
                .portfolio-link { color: ${royalMutedTextColor}; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2><span style="font-size: 28px;">👋</span> Hello ${name},</h2>
                <p>Thank you for reaching out! I've received your message regarding: "<strong>${subject}</strong>".</p>
                <p>I appreciate you taking the time to contact me. I'll review your inquiry and aim to get back to you as soon as possible.</p>
                <div class="signature">
                    <p>Best regards,</p>
                    <p>PK Singh</p>
                    <p><a href="${portfolioUrl}" class="portfolio-link">${websiteName}</a></p> 
                </div>
            </div>
            <div class="footer"> <p>This is an automated response. You're receiving this email because you submitted the contact form on ${websiteName}.</p> </div>
        </body>
        </html>
      `,
    };

    console.log("Attempting to send user confirmation email...");
    await transporter.sendMail(userMailOptions);
    console.log("User confirmation email sent successfully.");

    return NextResponse.json({ success: true, message: "Message sent successfully! You should receive a confirmation email shortly." }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/contact (Nodemailer):", error); // This will log the detailed error to Netlify Function logs
    
    let errorMessage = "Failed to send your message. Please try again later.";
    let errorDetails;

    if (error instanceof Error) {
      errorDetails = error.message; // Keep detailed message for server logs
      // You might check error.code for specific Nodemailer errors here if needed
      if ((error as any).code === 'EENVELOPE') { // Example: specific error code from Nodemailer
        errorMessage = "There was an issue with the recipient or sender email address.";
      } else if ((error as any).code === 'EAUTH') {
        errorMessage = "Authentication with the email server failed. Please check credentials.";
      }
    }
    
    // For the client, return a generic message but log details on the server
    return NextResponse.json({ success: false, error: errorMessage, serverErrorDetails: process.env.NODE_ENV !== 'production' ? errorDetails : undefined }, { status: 500 });
  }
}
