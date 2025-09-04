import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { Exercise } from "@/lib/mongoose-models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ ok: false, error: "method not allowed" });
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    await dbConnect();
    const xs = await Exercise.find({}, { title: 1 }).sort({ createdAt: -1 }).lean();
    res.status(200).json({ ok: true, data: xs.map((x: any) => ({ _id: String(x._id), title: x.title })) });
}