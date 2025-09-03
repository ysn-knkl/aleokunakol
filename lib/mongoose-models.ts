// lib/mongoose-models.ts
import mongoose, { Schema, models, model, Types } from "mongoose";

/** User (NextAuth ile eşleşecek minimal saha) */
const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, index: true },
        name: String,
        role: { type: String, enum: ["admin", "therapist", "client"], default: "client", index: true },
    },
    { timestamps: true }
);

/** Media (resim/video/metin) – dosyayı Cloudinary/Supabase’de tutacağız */
const MediaSchema = new Schema(
    {
        type: { type: String, enum: ["image", "video", "text"], required: true },
        // text ise content doldur; image/video ise url doldur
        content: { type: String },       // text içeriği
        url: { type: String },           // dosya URL’i (CDN)
        width: Number,
        height: Number,
        duration: Number,                // video için saniye
        // ileride: storageKey, provider, publicId vs.
    },
    { _id: false } // embed edilen alt belge
);

/** Exercise (egzersiz) */
const ExerciseSchema = new Schema(
    {
        title: { type: String, required: true, index: "text" },
        slug: { type: String, required: true, unique: true, index: true },
        description: String,
        tags: [{ type: String, index: true }],
        level: { type: String, enum: ["easy", "medium", "hard"], default: "easy", index: true },
        bodyParts: [{ type: String, index: true }], // e.g., neck, shoulder...
        media: [MediaSchema],
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        localeBlocks: [
            {
                locale: { type: String, default: "de", index: true },
                title: String,
                description: String,
            },
        ],
    },
    { timestamps: true }
);

/** Assignment (egzersiz atama) */
const AssignmentSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        exerciseId: { type: Schema.Types.ObjectId, ref: "Exercise", required: true, index: true },
        schedule: {
            days: [{ type: String }], // ["mon","wed","fri"] gibi
            reps: Number,
            sets: Number,
        },
        startAt: Date,
        endAt: Date,
        notes: String,
        createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // atan kişi (therapist/admin)
        status: { type: String, enum: ["active", "paused", "completed"], default: "active", index: true },
    },
    { timestamps: true }
);

/** Progress (tamamlama kaydı) */
const ProgressSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
        exerciseId: { type: Schema.Types.ObjectId, ref: "Exercise", index: true },
        date: { type: Date, index: true },
        completed: { type: Boolean, default: false, index: true },
        painScore: Number,
        comment: String,
    },
    { timestamps: true }
);

// Hot-reload güvenli export
export const User = models.User || model("User", UserSchema);
export const Exercise = models.Exercise || model("Exercise", ExerciseSchema);
export const Assignment = models.Assignment || model("Assignment", AssignmentSchema);
export const Progress = models.Progress || model("Progress", ProgressSchema);