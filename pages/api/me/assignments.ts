import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { dbConnect } from "@/lib/mongodb";
import { Assignment, User } from "@/lib/mongoose-models";
import { Types } from "mongoose";

/**
 * GET /api/me/assignments
 * - Oturum açmış kullanıcının atanmış egzersizlerini döner
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }

  const session = (await getServerSession(
    req,
    res,
    authOptions as any
  )) as Session | null;

  if (!session?.user?.email) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  await dbConnect();

  // Kullanıcı ID'sini bul (session.user.id varsa onu kullan; yoksa email ile DB'den çek)
  let userId: string | null = (session.user as any).id || null;

  if (!userId) {
    const userDoc = await User.findOne({ email: session.user.email })
      .select("_id")
      .lean<{ _id: Types.ObjectId } | null>();

    userId = userDoc?._id?.toString() ?? null;
  }

  if (!userId) {
    return res.status(404).json({ ok: false, error: "user not found" });
  }

  const items = await Assignment.find({ userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "exerciseId",
      select: "title slug level description media bodyParts tags",
    })
    .lean();

  // UI dostu veri
  const data = items
    .filter((a: any) => !!a.exerciseId)
    .map((a: any) => {
      const ex = a.exerciseId || {};
      return {
        assignmentId: String(a._id),
        schedule: a.schedule ?? {},
        startAt: a.startAt || null,
        endAt: a.endAt || null,
        status: a.status || "active",
        notes: a.notes || "",
        createdAt: a.createdAt,
        exercise: {
          id: String(ex._id),
          title: ex.title,
          slug: ex.slug,
          level: ex.level,
          description: ex.description || "",
          bodyParts: Array.isArray(ex.bodyParts) ? ex.bodyParts : [],
          tags: Array.isArray(ex.tags) ? ex.tags : [],
          media: Array.isArray(ex.media) ? ex.media : [],
        },
      };
    });

  return res.status(200).json({ ok: true, data });
}