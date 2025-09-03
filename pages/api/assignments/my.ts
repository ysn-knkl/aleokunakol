import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { Assignment, User, Exercise } from "@/lib/mongoose-models";
import { requireSession } from "@/lib/auth-helpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "method not allowed" });
  const user = await requireSession(req, res);
  if (!user) return;

  await dbConnect();
  // email → userId eşleştirmesi zaten requireSession’da yapıldı
  const items = await Assignment.find({ userId: user._id, status: { $ne: "completed" } })
    .sort({ createdAt: -1 })
    .populate({ path: "exerciseId", select: "title slug level media" });

  res.status(200).json({ ok: true, data: items });
}