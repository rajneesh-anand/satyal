import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
    token?: string;
    user: {
      address: string;
      image: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    image?: string;
  }
}
