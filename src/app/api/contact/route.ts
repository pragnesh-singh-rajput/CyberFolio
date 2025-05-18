
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Log received data for debugging
    console.log("Received contact form data:", { name, email, subject });

    // Check for essential environment variables
    const requiredEnvVars = [
      'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS',
      'CONTACT_FORM_EMAIL_TO', 'CONTACT_FORM_EMAIL_FROM'
    ];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      console.error("SMTP configuration error: Missing environment variables:", missingVars.join(', '));
      return NextResponse.json({
        success: false,
        error: "Server configuration error. Please contact support.",
        details: `Missing environment variables: ${missingVars.join(', ')}` // For server logs/debugging
      }, { status: 500 });
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports (like 587 which uses STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production', 
      }
    });

    const websiteName = "PK Singh's Portfolio"; 
    const portfolioUrl = process.env.PORTFOLIO_URL || "https://your-portfolio-url.com";

    // Royal Theme Colors (Hex for email compatibility)
    const royalBackgroundColor = "#0A0F1A"; // Deep Royal Blue/Indigo (adjusted from HSL for direct use)
    const royalCardBackgroundColor = "#141A2E"; // Slightly Lighter Deep Blue / Dark Slate Blue
    const royalTextColor = "#F0EAD6"; // Cream/Silver (adjusted for visibility)
    const royalMutedTextColor = "#A8A29E"; // Light Grayish Cream (adjusted for visibility)
    const royalAccentColor = "#FFBF00"; // Rich Gold/Bright Yellow (adjusted from HSL)
    const royalBorderColor = "#2E3A59"; // Dark Desaturated Blue Border

    // 1. Email to Admin
    const adminMailOptions = {
      from: `"${name}" <${process.env.CONTACT_FORM_EMAIL_FROM}>`,
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
                body { margin: 0; padding: 20px; background-color: ${royalBackgroundColor}; color: ${royalTextColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; }
                .container { max-width: 600px; margin: 20px auto; padding: 30px; background-color: ${royalCardBackgroundColor}; border-radius: 12px; border: 1px solid ${royalBorderColor}; box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
                h2 { color: ${royalAccentColor}; margin-top: 0; font-size: 26px; border-bottom: 1px solid ${royalBorderColor}; padding-bottom: 15px; margin-bottom: 25px; font-weight: 600; }
                p { line-height: 1.7; margin-bottom: 18px; color: ${royalTextColor}; }
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
                body { margin: 0; padding: 20px; background-color: ${royalBackgroundColor}; color: ${royalTextColor}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; }
                .container { max-width: 600px; margin: 20px auto; padding: 30px; background-color: ${royalCardBackgroundColor}; border-radius: 12px; border: 1px solid ${royalBorderColor}; box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
                h2 { color: ${royalAccentColor}; margin-top: 0; font-size: 26px; margin-bottom: 25px; font-weight: 600; }
                p { line-height: 1.7; margin-bottom: 18px; color: ${royalTextColor}; }
                strong { color: ${royalAccentColor}; font-weight: 600; }
                .signature { margin-top: 30px; line-height: 1.6; color: ${royalTextColor}; }
                .signature p { margin-bottom: 6px; }
                .footer { margin-top: 35px; text-align: center; font-size: 13px; color: ${royalMutedTextColor}; }
                a { color: ${royalAccentColor}; text-decoration: none; font-weight: 500; }
                a:hover { text-decoration: underline; }
                .portfolio-link { color: ${royalMutedTextColor}; } /* Changed from accent for better contrast */
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

  } catch (error: any) {
    // Log the full error object for better debugging on the server
    console.error("Error in /api/contact (Nodemailer):", error); 
    
    let errorMessage = "Failed to send your message. Please try again later.";
    let errorDetails = error.message || "An unknown error occurred";

    // Specific Nodemailer error codes can be checked here if needed
    // Example: if (error.code === 'EENVELOPE') { ... }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage, 
      // Include detailed error message only in non-production for client-side debugging
      serverErrorDetails: process.env.NODE_ENV !== 'production' ? errorDetails : undefined 
    }, { status: 500 });
  }
}
