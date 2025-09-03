import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/mongodb";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    res.status(200).json({ ok: true, db: "connected" });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message });
  }
}