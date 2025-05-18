
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Simulate sending an email
    console.log("==== CONTACT FORM API HIT ====");
    console.log("Simulating email send:");
    console.log(`To: your-email@example.com`); // Replace with your actual email address
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log("Message Body:");
    console.log(message);
    console.log("==============================");

    // In a real application, you would integrate an email sending service here.
    // For example, using Nodemailer or a service like Resend, SendGrid, etc.

    return NextResponse.json({ success: true, message: "Message received successfully (simulated send)" }, { status: 200 });

  } catch (error) {
    console.error("Error in /api/contact:", error);
    let errorMessage = "Failed to process your request.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: "Failed to process your request.", details: errorMessage }, { status: 500 });
  }
}
