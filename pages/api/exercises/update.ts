import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Exercise } from "@/lib/mongoose-models";
import { requireSession, assertRole } from "@/lib/auth-helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") return res.status(405).json({ ok: false, error: "method not allowed" });
    try {
        const user = await requireSession(req, res);
        if (!user) return;
        assertRole(user, ["admin", "therapist"]);

        await dbConnect();
        const { id, ...updates } = req.body;
        if (!id) return res.status(400).json({ ok: false, error: "id required" });

        const updated = await Exercise.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) return res.status(404).json({ ok: false, error: "not found" });

        res.status(200).json({ ok: true, data: updated });
    } catch (e: any) {
        res.status(e?.status || 500).json({ ok: false, error: e?.message || "server error" });
    }
}