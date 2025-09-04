import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/mongoose-models";

const admins = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    /** JWT içine role yaz — middleware buradan okur */
    async jwt({ token, user }) {
      if (user?.email) {
        await dbConnect();
        const email = user.email.toLowerCase();
        const u = await User.findOne({ email });
        const role = u?.role || (admins.includes(email) ? "admin" : "client");
        (token as any).role = role;
      }
      return token;
    },

    /** Session içine de role koy — client tarafı için kullanışlı */
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = (token as any).role;
      }
      return session;
    },

    /** İlk login: kullanıcıyı Mongo'ya yaz/güncelle */
    async signIn({ user }) {
      if (!user?.email) return false;
      await dbConnect();
      const email = user.email.toLowerCase();
      const isAdmin = admins.includes(email);

      await User.findOneAndUpdate(
        { email },
        {
          $setOnInsert: { email, role: isAdmin ? "admin" : "client" },
          $set: { name: user.name || "", image: (user as any).image || "" },
        },
        { new: true, upsert: true }
      );
      return true;
    },
  },
};

export default NextAuth(authOptions);