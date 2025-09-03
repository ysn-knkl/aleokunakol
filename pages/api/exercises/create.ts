import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Exercise } from "@/lib/mongoose-models";
import { requireSession, assertRole } from "@/lib/auth-helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method not allowed" });
    try {
        const user = await requireSession(req, res);
        if (!user) return;
        assertRole(user, ["admin", "therapist"]);

        await dbConnect();

        const { title, slug, description, tags = [], level = "easy", bodyParts = [], media = [], localeBlocks = [] } = req.body;
        if (!title || !slug) return res.status(400).json({ ok: false, error: "title & slug required" });

        const created = await Exercise.create({
            title, slug, description, tags, level, bodyParts, media, localeBlocks, createdBy: user._id
        });

        res.status(201).json({ ok: true, data: created });
    } catch (e: any) {
        res.status(e?.status || 500).json({ ok: false, error: e?.message || "server error" });
    }
}