import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { User } from "@/lib/mongoose-models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "method not allowed" });
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  await dbConnect();

  const { q = "", page = "1", pageSize = "20" } = req.query as Record<string, string>;

  const filter: any = q
    ? { $or: [{ email: { $regex: q, $options: "i" } }, { name: { $regex: q, $options: "i" } }] }
    : {};

  const p = Math.max(parseInt(page, 10) || 1, 1);
  const ps = Math.min(Math.max(parseInt(pageSize, 10) || 20, 1), 100);

  const [items, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((p - 1) * ps)
      .limit(ps)
      .select("_id email name role lastLoginAt createdAt")
      .lean(),
    User.countDocuments(filter),
  ]);

  res.status(200).json({ ok: true, data: items, page: p, pageSize: ps, total });
}