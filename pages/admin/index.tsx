import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as React from "react";
import AdminShell from "@/components/admin/AdminShell";
import MediaUploader from "@/components/admin/MediaUploader";

type UserRow = { _id: string; email: string; name?: string; role: string };
type ExerciseRow = { _id: string; title: string };

const AdminPage: NextPage = () => {
  // State
  const [users, setUsers] = React.useState<UserRow[]>([]);
  const [exercises, setExercises] = React.useState<ExerciseRow[]>([]);
  const [query, setQuery] = React.useState("");
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [loadingAssign, setLoadingAssign] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedExercise, setSelectedExercise] = React.useState("");
  const [reps, setReps] = React.useState<number>(10);
  const [sets, setSets] = React.useState<number>(3);
  const [days, setDays] = React.useState<string[]>(["mon", "wed", "fri"]);

  // ▼ Kullanıcı atamaları (Drawer)
  const [assignmentsOpen, setAssignmentsOpen] = React.useState(false);
  const [assignments, setAssignments] = React.useState<any[]>([]);
  const [loadingAssignments, setLoadingAssignments] = React.useState(false);

  // CRUD bölümü (mevcut egzersiz listesi vs.)
  const [exercisesFull, setExercisesFull] = React.useState<any[]>([]);
  const [crudLoading, setCrudLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState<null | "create" | "edit">(null);
  const [editing, setEditing] = React.useState<any>(null);

  // Helpers
  const fetchUsers = async (q = "") => {
    setLoadingUsers(true);
    const r = await fetch(`/api/admin/users?q=${encodeURIComponent(q)}`).then((x) => x.json());
    setUsers(r?.data ?? []);
    setLoadingUsers(false);
  };

  // ▼ Atama listeleme/silme helper'ları
  const fetchAssignments = async (uid: string) => {
    if (!uid) return;
    setLoadingAssignments(true);
    const r = await fetch(`/api/admin/assignments?userId=${encodeURIComponent(uid)}`).then((x) => x.json());
    setAssignments(r?.data ?? []);
    setLoadingAssignments(false);
  };

  const openAssignments = async (uid: string) => {
    setSelectedUser(uid);
    setAssignmentsOpen(true);
    await fetchAssignments(uid);
  };

  const deleteAssignment = async (id: string) => {
    if (!confirm("Bu atamayı silmek istediğine emin misin?")) return;
    const r = await fetch(`/api/admin/assignments?id=${encodeURIComponent(id)}`, { method: "DELETE" }).then((x) =>
      x.json()
    );
    if (!r?.ok) {
      alert(r?.error || "Hata");
      return;
    }
    setAssignments((list) => list.filter((a: any) => String(a._id) !== String(id)));
  };

  const refreshExercises = async () => {
    const r1 = await fetch(`/api/admin/exercises`).then((x) => x.json());
    setExercises(r1?.data ?? []);
    const fx = await fetch(`/api/exercises?pageSize=200`).then((x) => x.json());
    setExercisesFull(fx?.data ?? []);
  };

  // initial loads
  React.useEffect(() => {
    fetchUsers();
    (async () => {
      const r = await fetch(`/api/admin/exercises`).then((x) => x.json());
      setExercises(r?.data ?? []);
      const fx = await fetch(`/api/exercises?pageSize=200`).then((x) => x.json());
      setExercisesFull(fx?.data ?? []);
    })();
  }, []);

  // arama debounce
  React.useEffect(() => {
    const t = setTimeout(() => fetchUsers(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const dayOptions = React.useMemo(
    () => [
      { key: "mon", label: "Mon" },
      { key: "tue", label: "Tue" },
      { key: "wed", label: "Wed" },
      { key: "thu", label: "Thu" },
      { key: "fri", label: "Fri" },
      { key: "sat", label: "Sat" },
      { key: "sun", label: "Sun" },
    ],
    []
  );

  const toggleDay = (d: string) => {
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  const assign = async () => {
    if (!selectedUser || !selectedExercise) {
      alert("Kullanıcı ve egzersiz seçin.");
      return;
    }
    setLoadingAssign(true);
    const res = await fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: selectedUser,
        exerciseId: selectedExercise,
        schedule: { days, reps, sets },
      }),
    }).then((r) => r.json());
    setLoadingAssign(false);
    if (res.ok) {
      alert("Atama başarılı ✅");
      // Drawer açıksa otomatik yenile
      if (assignmentsOpen && selectedUser) fetchAssignments(selectedUser);
    } else {
      alert(res.error || "Hata");
    }
  };

  // CRUD helpers (egzersiz oluştur/güncelle/sil)
  const openEdit = (row: any) => {
    setEditing({
      id: row._id || row.id,
      title: row.title || "",
      slug: row.slug || "",
      description: row.description || "",
      level: row.level || "easy",
      tags: Array.isArray(row.tags) ? row.tags.join(", ") : row.tags || "",
      bodyParts: Array.isArray(row.bodyParts) ? row.bodyParts.join(", ") : row.bodyParts || "",
      images: Array.isArray(row.media) ? row.media.filter((m: any) => m.type === "image").map((m: any) => m.url).join(", ") : "",
      youtube: Array.isArray(row.media) ? (row.media.find((m: any) => m.type === "video")?.url || "") : "",
      text: Array.isArray(row.media) ? (row.media.find((m: any) => m.type === "text")?.content || "") : "",
    });
    setShowModal("edit");
  };

  const handleCreate = async (payload: any) => {
    setCrudLoading(true);
    const res = await fetch("/api/exercises/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
    setCrudLoading(false);
    if (!res.ok) return alert(res.error || "Hata");
    setShowModal(null);
    await refreshExercises();
  };

  const handleUpdate = async (id: string, payload: any) => {
    setCrudLoading(true);
    const res = await fetch("/api/exercises/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...payload }),
    }).then((r) => r.json());
    setCrudLoading(false);
    if (!res.ok) return alert(res.error || "Hata");
    setShowModal(null);
    await refreshExercises();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu egzersizi silmek istediğine emin misin?")) return;
    setCrudLoading(true);
    const res = await fetch(`/api/exercises/delete?id=${encodeURIComponent(id)}`, { method: "DELETE" }).then((r) =>
      r.json()
    );
    setCrudLoading(false);
    if (!res.ok) return alert(res.error || "Hata");
    await refreshExercises();
  };

  return (
    <AdminShell>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sol: Atama alanı */}
        <div className="rounded-2xl border border-brand-300/30 bg-white shadow-soft p-6">
          <h2 className="text-xl font-semibold mb-4">Egzersiz Atama</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* User seçimi */}
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Kullanıcı</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Seçiniz</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Egzersiz seçimi */}
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Egzersiz</label>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Seçiniz</option>
                {exercises.map((x) => (
                  <option key={x._id} value={x._id}>
                    {x.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Program */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1 text-text-secondary">Set</label>
                <input
                  type="number"
                  min={1}
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value || "0", 10))}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-text-secondary">Tekrar</label>
                <input
                  type="number"
                  min={1}
                  value={reps}
                  onChange={(e) => setReps(parseInt(e.target.value || "0", 10))}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-text-secondary">Günler</label>
                <div className="flex flex-wrap gap-2">
                  {dayOptions.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => toggleDay(d.key)}
                      className={`px-3 py-1 rounded-lg border ${days.includes(d.key) ? "bg-black text-white" : ""}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                onClick={assign}
                disabled={loadingAssign}
                className="btn-outline bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {loadingAssign ? "Atanıyor..." : "Ata"}
              </button>
            </div>
          </div>
        </div>

        {/* Sağ: Kullanıcılar tablosu */}
        <div className="rounded-2xl border border-brand-300/30 bg-white shadow-soft p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold">Kullanıcılar</h2>
            <input
              className="border rounded-lg px-3 py-2 w-full max-w-[240px]"
              placeholder="Ara (email, ad)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-text-secondary">
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Ad</th>
                  <th className="py-2 pr-3">Rol</th>
                  <th className="py-2 pr-3">ID</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-text-muted">
                      Yükleniyor…
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-text-muted">
                      Kayıt bulunamadı.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t hover:bg-surface-50 cursor-pointer"
                      onClick={() => openAssignments(u._id)}
                    >
                      <td className="py-2 pr-3">{u.email}</td>
                      <td className="py-2 pr-3">{u.name || "-"}</td>
                      <td className="py-2 pr-3">
                        <span className="px-2 py-1 rounded-full border text-xs">{u.role}</span>
                      </td>
                      <td className="py-2 font-mono text-xs">{u._id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {selectedUser && (
            <div className="mt-4 text-xs text-text-secondary">
              Seçili kullanıcı: <span className="font-mono">{selectedUser}</span>
            </div>
          )}
        </div>

        {/* Drawer: Kullanıcı atamaları */}
        {assignmentsOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/30" onClick={() => setAssignmentsOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Atanan Egzersizler</h3>
                <button className="px-3 py-1 rounded border" onClick={() => setAssignmentsOpen(false)}>
                  Kapat
                </button>
              </div>

              {selectedUser && (
                <div className="mb-3 text-xs text-text-secondary">
                  Kullanıcı ID: <span className="font-mono">{selectedUser}</span>
                </div>
              )}

              <div className="mb-4">
                <button className="px-3 py-2 rounded border" onClick={() => fetchAssignments(selectedUser)}>
                  Yenile
                </button>
              </div>

              {loadingAssignments ? (
                <div className="text-sm text-text-secondary">Yükleniyor…</div>
              ) : assignments.length === 0 ? (
                <div className="text-sm text-text-secondary">Bu kullanıcıya henüz egzersiz atanmamış.</div>
              ) : (
                <ul className="space-y-3">
                  {assignments.map((a: any) => (
                    <li key={a._id} className="border rounded-xl p-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{a.exercise?.title || "Silinmiş egzersiz"}</div>
                        <div className="text-xs text-text-secondary mt-1">
                          {(a.schedule?.sets ? a.schedule.sets + " set" : "-")} •{" "}
                          {(a.schedule?.reps ? a.schedule.reps + " tekrar" : "-")} •{" "}
                          {Array.isArray(a.schedule?.days) ? a.schedule.days.join(", ") : "-"}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteAssignment(a._id)}
                        className="px-2 py-1 rounded border hover:bg-surface-50"
                      >
                        Sil
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Egzersiz Yönetimi (CRUD) – mevcut yapın korunarak */}
        <div className="rounded-2xl border border-brand-300/30 bg-white shadow-soft p-6 lg:col-span-2">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold">Egzersiz Yönetimi</h2>
            <button
              onClick={() => {
                setEditing({
                  id: "",
                  title: "",
                  slug: "",
                  description: "",
                  level: "easy",
                  tags: "",
                  bodyParts: "",
                  images: "",
                  youtube: "",
                  text: "",
                });
                setShowModal("create");
              }}
              className="px-3 py-2 rounded-lg border"
            >
              Yeni egzersiz
            </button>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-text-secondary">
                  <th className="py-2 pr-3">Başlık</th>
                  <th className="py-2 pr-3">Seviye</th>
                  <th className="py-2 pr-3">Etiketler</th>
                  <th className="py-2 pr-3">Bölge</th>
                  <th className="py-2 pr-3">Slug</th>
                  <th className="py-2">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {exercisesFull.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-text-muted">
                      Kayıt yok.
                    </td>
                  </tr>
                ) : (
                  exercisesFull.map((x: any) => (
                    <tr key={x._id || x.id} className="border-t">
                      <td className="py-2 pr-3">{x.title}</td>
                      <td className="py-2 pr-3">{x.level || "-"}</td>
                      <td className="py-2 pr-3">{Array.isArray(x.tags) ? x.tags.join(", ") : "-"}</td>
                      <td className="py-2 pr-3">{Array.isArray(x.bodyParts) ? x.bodyParts.join(", ") : "-"}</td>
                      <td className="py-2 pr-3">{x.slug || "-"}</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(x)} className="px-2 py-1 rounded border hover:bg-surface-50">
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(String(x._id || x.id))}
                            className="px-2 py-1 rounded border hover:bg-surface-50"
                          >
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* CREATE/EDIT MODAL */}
          {showModal && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(null)} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {showModal === "create" ? "Yeni Egzersiz" : "Egzersizi Düzenle"}
                </h3>

                <div className="grid gap-3">
                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="Başlık"
                    value={editing?.title || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, title: e.target.value }))}
                  />
                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="Slug"
                    value={editing?.slug || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, slug: e.target.value }))}
                  />
                  <textarea
                    className="border rounded-lg px-3 py-2"
                    placeholder="Açıklama"
                    rows={3}
                    value={editing?.description || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, description: e.target.value }))}
                  />
                  <div className="grid md:grid-cols-3 gap-3">
                    <select
                      className="border rounded-lg px-3 py-2"
                      value={editing?.level || "easy"}
                      onChange={(e) => setEditing((s: any) => ({ ...s, level: e.target.value }))}
                    >
                      <option value="easy">easy</option>
                      <option value="medium">medium</option>
                      <option value="hard">hard</option>
                    </select>
                    <input
                      className="border rounded-lg px-3 py-2"
                      placeholder="Etiketler (virgül ile)"
                      value={editing?.tags || ""}
                      onChange={(e) => setEditing((s: any) => ({ ...s, tags: e.target.value }))}
                    />
                    <input
                      className="border rounded-lg px-3 py-2"
                      placeholder="Bölge (virgül ile)"
                      value={editing?.bodyParts || ""}
                      onChange={(e) => setEditing((s: any) => ({ ...s, bodyParts: e.target.value }))}
                    />
                  </div>

                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="Görseller (virgül ile URL)"
                    value={editing?.images || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, images: e.target.value }))}
                  />
                  <MediaUploader onUploaded={(urls) => setEditing((s: any) => ({ ...s, images: urls.join(", ") }))} />

                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="YouTube/Video URL"
                    value={editing?.youtube || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, youtube: e.target.value }))}
                  />
                  <textarea
                    className="border rounded-lg px-3 py-2"
                    placeholder="Metin içeriği (opsiyonel)"
                    rows={2}
                    value={editing?.text || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, text: e.target.value }))}
                  />
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button className="px-3 py-2 rounded-lg border" onClick={() => setShowModal(null)}>
                    Vazgeç
                  </button>
                  <button
                    className="px-3 py-2 rounded-lg border bg-black text-white disabled:opacity-50"
                    disabled={crudLoading}
                    onClick={() => {
                      const media: any[] = [];
                      const imgs = (editing?.images || "")
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean);
                      imgs.forEach((u: string) => media.push({ type: "image", url: u }));
                      if (editing?.youtube) media.push({ type: "video", url: editing.youtube });
                      if (editing?.text) media.push({ type: "text", content: editing.text });

                      const payload = {
                        title: editing?.title,
                        slug: editing?.slug,
                        description: editing?.description,
                        level: editing?.level,
                        tags: editing?.tags ? editing.tags.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
                        bodyParts: editing?.bodyParts
                          ? editing.bodyParts.split(",").map((s: string) => s.trim()).filter(Boolean)
                          : [],
                        media,
                      };

                      if (showModal === "create") return handleCreate(payload);
                      return handleUpdate(editing.id, payload);
                    }}
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminPage;

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