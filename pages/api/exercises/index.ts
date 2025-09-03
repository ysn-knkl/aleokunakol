import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Exercise } from "@/lib/mongoose-models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ ok: false, error: "method not allowed" });
    await dbConnect();

    const { q, tag, level, body, page = "1", pageSize = "20" } = req.query as Record<string, string>;
    const filter: any = {};
    if (q) filter.$text = { $search: String(q) };
    if (tag) filter.tags = String(tag);
    if (level) filter.level = String(level);
    if (body) filter.bodyParts = String(body);

    const p = Math.max(parseInt(page, 10) || 1, 1);
    const ps = Math.min(Math.max(parseInt(pageSize, 10) || 20, 1), 100);

    const [items, total] = await Promise.all([
        Exercise.find(filter).sort({ createdAt: -1 }).skip((p - 1) * ps).limit(ps),
        Exercise.countDocuments(filter),
    ]);

    res.status(200).json({ ok: true, data: items, page: p, pageSize: ps, total });
}