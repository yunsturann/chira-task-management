import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const formBody: ContactForm = await request.json();

  const SMTP_EMAIL = process.env.SMTP_EMAIL;
  const SMTP_PASS = process.env.SMTP_PASSWORD;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });

  // verify auth
  try {
    await transport.verify();
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Invalid SMTP credentials" },
      { status: 401 }
    );
  }

  // send email
  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: SMTP_EMAIL,
      subject: formBody.subject,
      html: `
            <p>Name: ${formBody.name}</p>
            <p>Email: ${formBody.email}</p>
            <p>Message: ${formBody.message}</p>
            `,
    });

    return NextResponse.json(
      { error: false, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
