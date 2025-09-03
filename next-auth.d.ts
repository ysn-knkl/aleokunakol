// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /** Session tipini genişletiyoruz */
    interface Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            // istersen buraya role da ekleyebilirsin:
            // role?: "admin" | "therapist" | "client";
        } & DefaultSession["user"];
    }
}