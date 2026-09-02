import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [phoneNumberClient()],
});
export const { signIn, signUp, signOut, useSession } = createAuthClient();
