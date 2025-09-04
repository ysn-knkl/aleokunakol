import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";

type UserRow = { _id: string; email: string; name?: string; role: string };
type ExerciseRow = { _id: string; title: string };

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [exercises, setExercises] = useState<ExerciseRow[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`/api/admin/users?q=${encodeURIComponent(q)}`)
      .then(r => r.json())
      .then(d => setUsers(d.data || []));
  }, [q]);

  useEffect(() => {
    fetch("/api/admin/exercises")
      .then(r => r.json())
      .then(d => setExercises(d.data || []));
  }, []);

  const assign = async () => {
    if (!selectedUser || !selectedExercise) return alert("Kullanıcı ve egzersiz seçin");
    setLoading(true);
    const res = await fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser,
        exerciseId: selectedExercise,
        schedule: { days: ["mon", "wed", "fri"], reps: 10, sets: 3 },
      }),
    }).then(r => r.json());
    setLoading(false);
    if (res.ok) alert("Atama başarılı ✅");
    else alert(res.error || "Hata");
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="mb-6 flex gap-3 items-center">
        <input
          className="border rounded px-3 py-2 w-80"
          placeholder="Kullanıcı ara (email, ad)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Kullanıcı seç</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.email} {u.name ? `(${u.name})` : ""} — {u.role}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          <option value="">Egzersiz seç</option>
          {exercises.map((x) => (
            <option key={x._id} value={x._id}>
              {x.title}
            </option>
          ))}
        </select>

        <button
          onClick={assign}
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? "Atanıyor..." : "Ata"}
        </button>
      </div>

      <div className="rounded border p-4">
        <h2 className="font-semibold mb-2">Kullanıcılar</h2>
        <ul className="space-y-1 text-sm">
          {users.map((u) => (
            <li key={u._id}>
              <span className="font-mono">{u._id}</span> — {u.email} {u.name ? `(${u.name})` : ""} — {u.role}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// SSR guard: sadece admin
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = (await getServerSession(
    ctx.req as any,
    ctx.res as any,
    authOptions as any
  )) as Session | null;

  if (!session?.user?.email || (session.user as any).role !== "admin") {
    const locale = ctx.locale || "de";
    return {
      redirect: {
        destination: `/${locale}/login?callbackUrl=/admin`,
        permanent: false,
      },
    };
  }
  return { props: {} };
};