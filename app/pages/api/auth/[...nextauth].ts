import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },

        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if user exists
        const user = await findUserByEmail(credentials?.email);
        if (user) {
          return {
            id: user.id.toString(), // Convert id to string
            name: user.name,
            email: user.email,
          };
        }
        return credentials
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
