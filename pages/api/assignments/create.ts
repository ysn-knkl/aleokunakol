import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Assignment } from "@/lib/mongoose-models";
import { requireSession, assertRole } from "@/lib/auth-helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method not allowed" });
    try {
        const user = await requireSession(req, res);
        if (!user) return;
        assertRole(user, ["admin", "therapist"]);

        await dbConnect();

        const exerciseId = req.body.exerciseId;
        const schedule = req.body.schedule ?? {};
        const startAt = req.body.startAt;
        const endAt = req.body.endAt;
        const notes = req.body.notes;
        const targetUserId = req.body.userId === "me" ? user._id : req.body.userId;
        if (!targetUserId || !exerciseId) return res.status(400).json({ ok: false, error: "userId & exerciseId required" });

        const created = await Assignment.create({
            userId: targetUserId,
            exerciseId,
            schedule,
            startAt: startAt ? new Date(startAt) : undefined,
            endAt: endAt ? new Date(endAt) : undefined,
            notes,
            createdBy: user._id,
        });

        res.status(201).json({ ok: true, data: created });
    } catch (e: any) {
        res.status(e?.status || 500).json({ ok: false, error: e?.message || "server error" });
    }
}