
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465', 
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
    const royalBackgroundColor = "#0A0F1A"; // Very Dark Blue/Indigo (hsl(240 60% 8%)) - slightly darker for full bg
    const royalCardBackgroundColor = "#141A2E"; // Dark Blue (hsl(230 50% 13%))
    const royalTextColor = "#F0EAD6"; // Cream (hsl(45 30% 92%))
    const royalMutedTextColor = "#A8A29E"; // Light Grayish Cream (hsl(30 10% 70%))
    const royalAccentColor = "#FFBF00"; // Rich Gold (Amber/Gold)
    const royalBorderColor = "#2E3A59"; // Dark Desaturated Blue (hsl(225 30% 25%))

    // 1. Email to Admin (Royal Dark Theme)
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
                    background-color: ${royalBackgroundColor};
                    color: ${royalTextColor};
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 30px;
                    background-color: ${royalCardBackgroundColor};
                    border-radius: 12px;
                    border: 1px solid ${royalBorderColor};
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }
                h2 {
                    color: ${royalAccentColor};
                    margin-top: 0;
                    font-size: 26px;
                    border-bottom: 1px solid ${royalBorderColor};
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                    font-weight: 600;
                }
                p {
                    line-height: 1.7;
                    margin-bottom: 18px;
                    font-size: 16px;
                    color: ${royalTextColor};
                }
                .label {
                    color: ${royalMutedTextColor};
                    font-weight: 500;
                    display: block;
                    margin-bottom: 5px;
                    font-size: 14px;
                }
                .value {
                    margin-bottom: 20px;
                    color: ${royalTextColor};
                    font-weight: 500;
                }
                .message-content {
                    white-space: pre-wrap; 
                    padding: 20px;
                    background-color: ${royalBackgroundColor}; 
                    border-radius: 8px;
                    border: 1px solid ${royalBorderColor};
                    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
                    font-size: 15px;
                    line-height: 1.7;
                    color: ${royalTextColor}; 
                }
                .footer {
                    margin-top: 35px;
                    text-align: center;
                    font-size: 13px;
                    color: ${royalMutedTextColor};
                }
                a {
                    color: ${royalAccentColor};
                    text-decoration: none;
                    font-weight: 500;
                }
                a:hover {
                    text-decoration: underline;
                }
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
            <div class="footer">
                <p>This email was sent from the contact form on ${websiteName}.</p>
            </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Thank You Email to User (Royal Dark Theme)
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
                    background-color: ${royalBackgroundColor};
                    color: ${royalTextColor};
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 30px;
                    background-color: ${royalCardBackgroundColor};
                    border-radius: 12px;
                    border: 1px solid ${royalBorderColor};
                    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                }
                h2 {
                    color: ${royalAccentColor};
                    margin-top: 0;
                    font-size: 26px;
                    margin-bottom: 25px;
                    font-weight: 600;
                }
                p {
                    line-height: 1.7;
                    margin-bottom: 18px;
                    font-size: 16px;
                    color: ${royalTextColor};
                }
                strong {
                    color: ${royalAccentColor}; 
                    font-weight: 600;
                }
                .signature {
                    margin-top: 30px;
                    line-height: 1.6;
                    color: ${royalTextColor};
                }
                .signature p {
                    margin-bottom: 6px;
                }
                .footer {
                    margin-top: 35px;
                    text-align: center;
                    font-size: 13px;
                    color: ${royalMutedTextColor};
                }
                a {
                    color: ${royalAccentColor};
                    text-decoration: none;
                    font-weight: 500;
                }
                a:hover {
                    text-decoration: underline;
                }
                .portfolio-link {
                   color: ${royalMutedTextColor};
                }
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
    }

    return NextResponse.json({ success: true, message: "Message sent successfully! You should receive a confirmation email shortly." }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/contact (Nodemailer):", error);
    let errorMessage = "Failed to send your message.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    const details = process.env.NODE_ENV !== 'production' ? errorMessage : undefined;
    return NextResponse.json({ success: false, error: "Failed to send your message. Please try again later.", details }, { status: 500 });
  }
}
