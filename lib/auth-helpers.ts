// lib/auth-helpers.ts
import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/mongoose-models";
import type { Session } from "next-auth";

export type Role = "admin" | "therapist" | "client";

export async function requireSession(req: NextApiRequest, res: NextApiResponse) {
    const session: Session | null = await getServerSession(req, res, authOptions as any);

    if (!session?.user?.email) {
        res.status(401).json({ ok: false, error: "unauthorized" });
        return null;
    }

    await dbConnect();
    let user = await User.findOne({ email: session.user.email });
    if (!user) {
        user = await User.create({
            email: session.user.email,
            name: session.user.name,
            role: "client",
        });
    }
    return user; // {_id, email, role, ...}
}

export function assertRole(user: { role?: string }, roles: Role[]) {
    const ok = !!user?.role && roles.includes(user.role as Role);
    if (!ok) {
        const err: any = new Error("forbidden");
        err.status = 403;
        throw err;
    }
}

export async function requireAdmin(req: any, res: any) {
    const user = await requireSession(req, res);
    if (!user) return null; // 401
    assertRole(user, ["admin"]); // 403 atabilir
    return user;
}