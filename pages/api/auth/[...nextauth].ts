// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("AUTH ERROR", code, metadata);
    },
    warn(code) {
      console.warn("AUTH WARN", code);
    },
    debug(code, metadata) {
      console.debug("AUTH DEBUG", code, metadata);
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider) token.provider = account.provider;
      return token;
    },
    async session({ session, token }) {
      (session as any).provider = (token as any).provider;
      return session;
    },
  },
};

export default NextAuth(authOptions);