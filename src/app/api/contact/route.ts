
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
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      }
    });

    // 1. Email to Admin (styled)
    const adminMailOptions = {
      from: `"${name}" <${process.env.CONTACT_FORM_EMAIL_FROM}>`,
      replyTo: email,
      to: process.env.CONTACT_FORM_EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                    margin: 0;
                    padding: 0;
                    background-color: #111827; /* Dark background */
                    color: #E5E7EB; /* Light foreground */
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #1F2937; /* Slightly lighter card background */
                    border-radius: 8px;
                    border: 1px solid #374151; /* Border color */
                }
                h2 {
                    color: #2DD4BF; /* Accent color */
                    margin-top: 0;
                }
                p {
                    line-height: 1.6;
                    margin-bottom: 10px;
                }
                strong {
                    color: #9CA3AF; /* Muted text for labels */
                }
                .message-content {
                    white-space: pre-wrap;
                    padding: 10px;
                    background-color: #111827;
                    border-radius: 4px;
                    border: 1px solid #374151;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 0.9em;
                    color: #6B7280;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2DD4BF;">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
                <p>This email was sent from your portfolio contact form.</p>
            </div>
        </body>
        </html>
      `,
    };

    // Send the email to admin
    await transporter.sendMail(adminMailOptions);

    // 2. Thank You Email to User (styled)
    const userMailOptions = {
      from: `PK Singh <${process.env.CONTACT_FORM_EMAIL_FROM}>`, // Use your name and verified sending email
      to: email, // User's email address
      subject: `Thank You for Your Message, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting Us!</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f9; /* Light grey background for user email */
                    color: #333333; /* Dark text */
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff; /* White card background */
                    border-radius: 8px;
                    border: 1px solid #dddddd;
                }
                h2 {
                    color: #174A3A; /* Darker accent for light theme */
                    margin-top: 0;
                }
                p {
                    line-height: 1.6;
                    margin-bottom: 10px;
                }
                strong {
                    color: #174A3A;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 0.9em;
                    color: #777777;
                }
                .signature {
                    margin-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Thank You for Reaching Out, ${name}!</h2>
                <p>I've received your message regarding: "<strong>${subject}</strong>".</p>
                <p>I'll review your inquiry and get back to you as soon as possible.</p>
                <div class="signature">
                    <p>Best regards,</p>
                    <p>PK Singh</p>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated response from PK Singh's Portfolio.</p>
            </div>
        </body>
        </html>
      `,
    };

    // Send the thank you email to user
    // We'll try to send it, but won't fail the whole request if this specific email fails,
    // as the primary goal (admin notification) might have succeeded.
    try {
      await transporter.sendMail(userMailOptions);
    } catch (userEmailError) {
      console.error("Failed to send thank you email to user:", userEmailError);
      // Optionally, you could log this error more formally or handle it,
      // but for now, we won't let it make the API call fail if the admin email succeeded.
    }

    return NextResponse.json({ success: true, message: "Message sent successfully! You should receive a confirmation email shortly." }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/contact (Nodemailer):", error);
    let errorMessage = "Failed to send your message.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: "Failed to send your message. Please try again later.", details: process.env.NODE_ENV !== 'production' ? errorMessage : undefined }, { status: 500 });
  }
}
