import { NextRequest, NextResponse } from "next/server";

// Helper function to escape HTML to prevent XSS
const escapeHtml = (text: string) => {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Verify reCAPTCHA token with Google's API
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("reCAPTCHA secret key is not configured. Skipping verification.");
    return true; // Allow requests if reCAPTCHA is not configured (for development)
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    
    // Verify response
    // Score threshold: 0.5 (adjustable, 0.0 = bot, 1.0 = human)
    // For reCAPTCHA v3, we check the score. For v2, we check success.
    return data.success === true && (data.score === undefined || data.score >= 0.5);
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return false; // Fail securely - reject if verification fails
  }
}

// Get access token from Microsoft Graph API using client credentials flow
async function getAccessToken(): Promise<string> {
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph API credentials are not configured");
  }

  // Check if placeholder values are still being used
  const placeholderPatterns = [
    "your-tenant-id-here",
    "your-client-id-here",
    "your-client-secret-here",
    "your-email@yourdomain.com",
  ];

  if (
    placeholderPatterns.includes(tenantId) ||
    placeholderPatterns.includes(clientId) ||
    placeholderPatterns.includes(clientSecret)
  ) {
    throw new Error(
      "Please update .env.local with actual Azure AD credentials. Placeholder values are still being used."
    );
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to get access token: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  return data.access_token;
}

// Send email using Microsoft Graph API
async function sendEmailViaGraph(
  accessToken: string,
  fromEmail: string,
  toEmail: string,
  subject: string,
  htmlContent: string
): Promise<void> {
  const graphUrl = `https://graph.microsoft.com/v1.0/users/${fromEmail}/sendMail`;

  const emailPayload = {
    message: {
      subject: subject,
      body: {
        contentType: "HTML",
        content: htmlContent,
      },
      toRecipients: [
        {
          emailAddress: {
            address: toEmail,
          },
        },
      ],
    },
  };

  const response = await fetch(graphUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to send email via Graph API: ${response.status} ${errorText}`
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (
      !process.env.MICROSOFT_TENANT_ID ||
      !process.env.MICROSOFT_CLIENT_ID ||
      !process.env.MICROSOFT_CLIENT_SECRET ||
      !process.env.EMAIL_USER
    ) {
      console.error("Microsoft Graph API configuration missing");
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Check if placeholder values are still being used in EMAIL_USER
    const placeholderEmailPatterns = ["your-email@yourdomain.com"];
    if (placeholderEmailPatterns.includes(process.env.EMAIL_USER)) {
      return NextResponse.json(
        {
          error:
            "Please update .env.local with your actual email address. Placeholder values are still being used.",
        },
        { status: 500 }
      );
    }

    const { name, email, phone, company, service, message, recaptchaToken } =
      await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: "reCAPTCHA verification is required" },
          { status: 400 }
        );
      }

      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    // Escape user inputs to prevent XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeCompany = company ? escapeHtml(company) : "";
    const safeService = service ? escapeHtml(service) : "";
    const safeMessage = escapeHtml(message);

    // Get access token
    const accessToken = await getAccessToken();

    // Email content for business notification
    const notificationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #0d9488; padding-bottom: 10px;">
          Picoids Labs — new lead
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
          ${
            safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""
          }
          ${
            safeService
              ? `<p><strong>Service of Interest:</strong> ${safeService}</p>`
              : ""
          }
        </div>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
          <p><strong>Submission Details:</strong></p>
          <p>Date: ${new Date().toLocaleString()}</p>
          <p>IP: ${request.headers.get("x-forwarded-for") || "Unknown"}</p>
        </div>
      </div>
    `;

    // Send notification email to business
    await sendEmailViaGraph(
      accessToken,
      process.env.EMAIL_USER,
      "connect@picoids.com",
      `Picoids Labs lead — ${safeService || "General inquiry"}`,
      notificationHtml
    );

    // Send confirmation email to the user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          Thank you for reaching out!
        </h2>
        
        <p>Dear ${safeName},</p>
        
        <p>Thank you for contacting Picoids Labs. We have received your message and will get back to you within one business day.</p>
        
        <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Your message summary</h3>
          <p><strong>Service:</strong> ${safeService || "General Inquiry"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6; background-color: white; padding: 15px; border-radius: 4px;">${safeMessage}</p>
        </div>
        
        <p>In the meantime, you can:</p>
        <ul>
          <li>Browse <a href="https://labs.picoids.com/services" style="color: #0d9488;">Labs services & pricing</a></li>
          <li>Visit <a href="https://picoids.com" style="color: #0d9488;">picoids.com</a> for enterprise consulting</li>
          <li>Call us at <strong>+91 8955225869</strong> for urgent matters</li>
        </ul>
        
        <p>Best regards,<br>
        <strong>The Picoids Labs team</strong></p>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
          <p><strong>Picoids Technology and Consulting</strong><br>
          Hanuman street, Jailwell<br>
          Bikaner, Rajasthan, India - 334001<br>
          Phone: +91 8955225869<br>
          Email: connect@picoids.com</p>
        </div>
      </div>
    `;

    await sendEmailViaGraph(
      accessToken,
      process.env.EMAIL_USER,
      email,
      "Thank you for contacting Picoids Labs",
      confirmationHtml
    );

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);

    // Provide more specific error messages for debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message);

      // Check for common Graph API errors
      if (error.message.includes("access token")) {
        return NextResponse.json(
          {
            error:
              "Email authentication failed. Please check Microsoft Graph API credentials.",
          },
          { status: 500 }
        );
      }
      if (error.message.includes("401") || error.message.includes("403")) {
        return NextResponse.json(
          {
            error:
              "Email service authentication failed. Please check permissions.",
          },
          { status: 500 }
        );
      }
      if (error.message.includes("404")) {
        return NextResponse.json(
          {
            error:
              "Email account not found. Please check the sender email address.",
          },
          { status: 500 }
        );
      }
      if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ETIMEDOUT")
      ) {
        return NextResponse.json(
          {
            error:
              "Network error. Please check your internet connection and try again.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
