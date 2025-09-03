import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/mongoose-models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // sadece local geliştirmede çalışsın
    if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ ok: false, error: "dev only" });
    }

    const session = (await getServerSession(req, res, authOptions as any)) as Session | null;
    if (!session?.user?.email) {
        return res.status(401).json({ ok: false, error: "unauthorized" });
    }

    await dbConnect();

    const user = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { role: "therapist" } },
        { new: true, upsert: true }
    );

    return res.status(200).json({ ok: true, role: user.role });
}