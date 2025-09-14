// pages/api/upload/sign.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth-helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // sadece POST kabul edelim
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method not allowed" });

  // sadece admin
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads";
  const eager = ""; // istersen eager dönüşümleri ekleyebilirsin

  // imzalanacak parametreleri oluştur
  const paramsToSign: Record<string, string | number> = { timestamp, folder };
  if (eager) paramsToSign.eager = eager;

  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET!);

  res.status(200).json({
    ok: true,
    data: {
      timestamp,
      folder,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY!,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      uploadUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
    },
  });
}