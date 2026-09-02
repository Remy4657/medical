import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "medical_db",
  max: 20,
  idleTimeoutMillis: 30000,
});
export const auth = betterAuth({
  database: pool,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    sendOnSignIn: false,
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, ctx) => {
        console.log("code: ", code);
        // Implement sending OTP code via SMS
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          console.log("phoneNumber: ", phoneNumber);
          return `${phoneNumber}@my-site.com`;
        },
        //optionally, you can also pass `getTempName` function to generate a temporary name for the user
        getTempName: (phoneNumber) => {
          return phoneNumber; //by default, it will use the phone number as the name
        },
      },
    }),
  ],
});
