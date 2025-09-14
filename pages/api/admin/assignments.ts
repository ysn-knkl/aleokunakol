import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { Assignment } from "@/lib/mongoose-models";

/**
 * GET  /api/admin/assignments?userId=...
 *   -> Belirli kullanıcıya atanmış egzersizleri listeler
 *
 * DELETE /api/admin/assignments?id=...
 *   -> Tek bir atamayı siler
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    await dbConnect();

    if (req.method === "GET") {
        const { userId } = req.query as { userId?: string };
        if (!userId) return res.status(400).json({ ok: false, error: "userId required" });

        const items = await Assignment.find({ userId })
            .sort({ createdAt: -1 })
            .populate({ path: "exerciseId", select: "title slug level" })
            .lean();

        const data = items.map((a: any) => ({
            _id: String(a._id),
            exercise: a.exerciseId
                ? {
                    _id: String(a.exerciseId._id),
                    title: a.exerciseId.title,
                    slug: a.exerciseId.slug,
                    level: a.exerciseId.level,
                }
                : null,
            schedule: a.schedule ?? {},
            startAt: a.startAt || null,
            endAt: a.endAt || null,
            notes: a.notes || "",
            status: a.status,
            createdAt: a.createdAt,
        }));

        return res.status(200).json({ ok: true, data });
    }

    if (req.method === "DELETE") {
        const { id } = (req.query as any) ?? {};
        if (!id) return res.status(400).json({ ok: false, error: "id required" });

        await Assignment.deleteOne({ _id: id });
        return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "method not allowed" });
}