
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info", // Added apikey and x-client-info
};

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

serve(async (req) => {
  console.log("Contact function invoked.");

  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    const errorMsg = "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in environment variables.";
    console.error(errorMsg);
    return new Response(
      JSON.stringify({ success: false, error: "Server configuration error.", details: errorMsg }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { name, email, subject, message } = await req.json();
    console.log("Received data:", { name, email, subject, message });


    if (!name || !email || !subject || !message) {
      console.log("Missing required fields.");
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields (name, email, subject, message)." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
📬 New Contact Form Message

👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}
💬 Message:
${message}
    `;

    console.log("Sending message to Telegram...");
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "HTML", // Using HTML for better formatting, ensure your message is HTML-safe
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorBody = await telegramResponse.text();
      console.error(
        `Failed to send Telegram message. Status: ${telegramResponse.status}, Body: ${errorBody}`
      );
      throw new Error(
        `Telegram API error: ${telegramResponse.status} - ${errorBody}`
      );
    }
    console.log("Telegram message sent successfully.");

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully!" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to process your request.",
        details: error.message || "An internal server error occurred.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
