import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { Assignment } from "@/lib/mongoose-models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method not allowed" });

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  await dbConnect();

  const { userId, exerciseId, schedule = {}, notes, startAt, endAt } = req.body || {};
  if (!userId || !exerciseId) return res.status(400).json({ ok: false, error: "userId & exerciseId required" });

  const created = await Assignment.create({
    userId,
    exerciseId,
    schedule,
    startAt: startAt ? new Date(startAt) : undefined,
    endAt: endAt ? new Date(endAt) : undefined,
    notes,
    createdBy: admin._id,
  });

  res.status(201).json({ ok: true, data: created });
}