import { NextResponse } from "next/server";

const jwt = require("jsonwebtoken") as {
  sign: (...args: any[]) => string;
};

const API_KEY_SID = process.env.STRINGEE_API_KEY_SID!;
const API_KEY_SECRET = process.env.STRINGEE_API_KEY_SECRET!;

function createStringeeToken() {
  return jwt.sign(
    {
      jti: `${API_KEY_SID}-${Date.now()}`,
      iss: API_KEY_SID,
      exp: Math.floor(Date.now() / 1000) + 3600,
      rest_api: true,
    },
    API_KEY_SECRET,
    {
      algorithm: "HS256",
      header: {
        typ: "JWT",
        alg: "HS256",
        cty: "stringee-api;v=1",
      },
    },
  );
}

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const token = createStringeeToken();

    const response = await fetch("https://api.stringee.com/v1/sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-STRINGEE-AUTH": token,
      },
      body: JSON.stringify({
        sms: [
          {
            from: "ANSINH",
            to: "84378404595",
            text: `Ma OTP cua ban la ${otp}. Ma co hieu luc trong 5 phut.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: response.status },
      );
    }

    // TODO:
    // Lưu otp hash vào Redis/DB ở đây.
    // Không nên trả OTP về client trong production.

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send OTP",
      },
      { status: 500 },
    );
  }
}
