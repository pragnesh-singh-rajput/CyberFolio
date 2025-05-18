
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Create a Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production', // Stricter TLS in production
      }
    });

    const websiteName = "PK Singh's Portfolio"; 
    const accentColor = "#2DD4BF"; // Teal accent from your theme
    const backgroundColor = "#111827"; // Dark background from your theme
    const cardBackgroundColor = "#1F2937"; // Slightly lighter card background
    const textColor = "#E5E7EB"; // Light text (light gray)
    const mutedTextColor = "#9CA3AF"; // Muted text (lighter gray)
    const portfolioUrl = "https://your-portfolio-url.com"; // Replace with your actual portfolio URL

    // 1. Email to Admin (styled)
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
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                    margin: 0;
                    padding: 20px;
                    background-color: ${backgroundColor};
                    color: ${textColor};
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 25px;
                    background-color: ${cardBackgroundColor};
                    border-radius: 12px;
                    border: 1px solid #374151; /* Slightly darker border */
                    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
                }
                h2 {
                    color: ${accentColor};
                    margin-top: 0;
                    font-size: 24px;
                    border-bottom: 1px solid #4A5568; /* Slightly lighter border */
                    padding-bottom: 12px;
                    margin-bottom: 20px;
                }
                p {
                    line-height: 1.7;
                    margin-bottom: 15px;
                    font-size: 16px;
                    color: ${textColor};
                }
                .label {
                    color: ${mutedTextColor};
                    font-weight: 600;
                    display: block;
                    margin-bottom: 4px;
                    font-size: 14px;
                }
                .value {
                    margin-bottom: 18px;
                    color: ${textColor};
                }
                .message-content {
                    white-space: pre-wrap; /* Preserves line breaks and spacing */
                    padding: 18px;
                    background-color: ${backgroundColor}; /* Even darker for contrast */
                    border-radius: 8px;
                    border: 1px solid #374151;
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                    font-size: 15px;
                    line-height: 1.65;
                    color: ${textColor}; 
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 13px;
                    color: ${mutedTextColor}; /* Ensuring footer text is light */
                }
                a {
                    color: ${accentColor};
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>📬 New Contact Form Submission</h2>
                <p><span class="label">From:</span> <span class="value">${name}</span></p>
                <p><span class="label">Email:</span> <span class="value"><a href="mailto:${email}">${email}</a></span></p>
                <p><span class="label">Subject:</span> <span class="value">${subject}</span></p>
                <p><span class="label">Message:</span></p>
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
                <p>This email was sent from the contact form on ${websiteName}.</p>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Thank You Email to User (styled, consistent dark theme)
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
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                    margin: 0;
                    padding: 20px;
                    background-color: ${backgroundColor};
                    color: ${textColor};
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 25px;
                    background-color: ${cardBackgroundColor};
                    border-radius: 12px;
                    border: 1px solid #374151;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
                }
                h2 {
                    color: ${accentColor};
                    margin-top: 0;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                p {
                    line-height: 1.7;
                    margin-bottom: 15px;
                    font-size: 16px;
                    color: ${textColor};
                }
                strong {
                    color: ${accentColor}; /* Make subject stand out more */
                    font-weight: 600;
                }
                .signature {
                    margin-top: 25px;
                    line-height: 1.6;
                    color: ${textColor};
                }
                .signature p {
                    margin-bottom: 5px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 13px;
                    color: ${mutedTextColor}; /* Ensuring footer text is light */
                }
                 a {
                    color: ${accentColor};
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
                .portfolio-link {
                   color: ${mutedTextColor}; /* For less prominent links */
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>👋 Hello ${name},</h2>
                <p>Thank you for reaching out! I've received your message regarding: "<strong>${subject}</strong>".</p>
                <p>I appreciate you taking the time to contact me. I'll review your inquiry and aim to get back to you as soon as possible.</p>
                <div class="signature">
                    <p>Best regards,</p>
                    <p>PK Singh</p>
                    <p><a href="${portfolioUrl}" class="portfolio-link">${websiteName}</a></p> 
                </div>
            </div>
            <div class="footer">
                <p>This is an automated response. You're receiving this email because you submitted the contact form on ${websiteName}.</p>
            </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(userMailOptions);
    } catch (userEmailError) {
      console.error("Failed to send thank you email to user:", userEmailError);
      // Not failing the whole request if only user email fails
    }

    return NextResponse.json({ success: true, message: "Message sent successfully! You should receive a confirmation email shortly." }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/contact (Nodemailer):", error);
    let errorMessage = "Failed to send your message.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    // Provide more specific error details in non-production environments for easier debugging
    const details = process.env.NODE_ENV !== 'production' ? errorMessage : undefined;
    return NextResponse.json({ success: false, error: "Failed to send your message. Please try again later.", details }, { status: 500 });
  }
}
