import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compareSync } from "bcrypt";
import prisma from "@utils/prisma";
import jwt from "jsonwebtoken";
import { getEnv } from "@utils/get-env";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        type: "credentials",
        credentials: {},
        async authorize(credentials) {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          try {
            const result = await prisma.user.findFirst({
              where: {
                AND: [{ email: email }],
              },
            });

            console.log(result);
            // User not found
            // if (!result) {
            //   await prisma.$disconnect();
            //   throw new Error("No user found with this email !");
            // }

            //Check hashed password with database password
            // const checkPassword = await compareSync(password, result.password);

            // Password Not Matched
            // if (!checkPassword) {
            //   throw new Error("Password is wrong !");
            // }
            // Login Success
            return result;
          } catch (error: any) {
            throw new Error(error.message);
          } finally {
            async () => {
              await prisma.$disconnect();
            };
          }
        },
      }),

      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),

      GoogleProvider({
        clientId: getEnv("GOOGLE_CLIENT_ID"),
        clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
      }),
    ],

    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
      // strategy: 'database',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    jwt: {
      secret: process.env.SECRET,
      // Set to true to use encryption (default: false)
      // encryption: true,

      encode: async ({ secret, token, maxAge }) => {
        const jwtClaims = {
          sub: token.sub.toString(),
          name: token.name,
          email: token.email,
          image: token.image,
          iat: Date.now() / 1000,
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        };
        const encodedToken = jwt.sign(jwtClaims, secret, {
          algorithm: "HS256",
        });
        return encodedToken;
      },
      decode: async ({ secret, token }) => {
        const decodedToken = jwt.verify(token, secret, { algorithms: "HS256" });
        return decodedToken;
      },

      // encode: async ({ secret, token, maxAge }) => {},
      // decode: async ({ secret, token, maxAge }) => {},
    },

    pages: {
      signIn: "/auth/signin", // Displays signin buttonsc
      error: "/auth/signin",
      // signOut: '/auth/signout', // Displays form with sign out button
      verifyRequest: "/auth/signin-verify", // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   return true;
      // },
      // async redirect({ url, baseUrl }) {
      //   return baseUrl;
      // },
      async session({ session, user, token }) {
        const encodedToken = jwt.sign(token, process.env.SECRET, {
          algorithm: "HS256",
        });
        session.id = token.id;
        session.user.image = token.image;
        session.token = encodedToken;
        return Promise.resolve(session);
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        const isUserSignedIn = user ? true : false;
        // make a http call to our graphql api
        // store this in postgres
        if (isUserSignedIn) {
          token.id = user.id.toString();
          token.image = user.image ? user.image.toString() : null;
        }
        return Promise.resolve(token);
      },
    },

    events: {},
    debug: process.env.NODE_ENV === "development",
  });
