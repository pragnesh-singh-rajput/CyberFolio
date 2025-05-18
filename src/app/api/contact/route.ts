
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
        // do not fail on invalid certs (for local development with self-signed certs)
        // remove this in production if you have a valid certificate
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      }
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.CONTACT_FORM_EMAIL_FROM}>`, // sender address (can be spoofed but better to use a real one)
      replyTo: email, // Set reply-to to the user's email
      to: process.env.CONTACT_FORM_EMAIL_TO, // list of receivers
      subject: `New Contact Form Submission: ${subject}`, // Subject line
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`, // plain text body
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `, // html body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully via Nodemailer!" }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/contact (Nodemailer):", error);
    let errorMessage = "Failed to send your message.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    // It's good practice not to expose too much detail from the error in the client response
    return NextResponse.json({ success: false, error: "Failed to send your message. Please try again later.", details: process.env.NODE_ENV !== 'production' ? errorMessage : undefined }, { status: 500 });
  }
}
