import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
    accessToken?: string;
    user: {
      id: string;
      address: string;
      image: string;
      name: string;
      userType: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface User {
    id: number;
    firstName?: string;
    accessToken?: string;
    userType?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    image?: string;
    accessToken?: string;
    userType?: string;
  }
}
