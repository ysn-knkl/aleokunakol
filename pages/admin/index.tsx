import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as React from "react";
import AdminShell from "@/components/admin/AdminShell";
import MediaUploader from "@/components/admin/MediaUploader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type UserRow = { _id: string; email: string; name?: string; role: string };
type ExerciseRow = { _id: string; title: string };

const AdminPage: NextPage = () => {
  const { t } = useTranslation("common");
  const na = t("common.notAvailable", "-");

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
    if (!confirm(t("admin.confirmDeleteAssignment", "Bu atamayı silmek istediğine emin misin?"))) return;
    const r = await fetch(`/api/admin/assignments?id=${encodeURIComponent(id)}`, { method: "DELETE" }).then((x) =>
      x.json()
    );
    if (!r?.ok) {
      alert(r?.error || t("common.error", "Hata"));
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
    const tmr = setTimeout(() => fetchUsers(query), 300);
    return () => clearTimeout(tmr);
  }, [query]);

  const dayOptions = React.useMemo(
    () => [
      { key: "mon", label: t("days.mon", "Pzt") },
      { key: "tue", label: t("days.tue", "Sal") },
      { key: "wed", label: t("days.wed", "Çar") },
      { key: "thu", label: t("days.thu", "Per") },
      { key: "fri", label: t("days.fri", "Cum") },
      { key: "sat", label: t("days.sat", "Cts") },
      { key: "sun", label: t("days.sun", "Paz") },
    ],
    [t]
  );

  const renderDays = (list: string[] | undefined) => {
    if (!Array.isArray(list) || list.length === 0) return na;
    return list.map((d) => t(`days.${d}`, d)).join(", ");
  };

  const renderLevel = (level: string | undefined) => {
    if (!level) return na;
    return t(`levels.${level}`, level);
  };

  const toggleDay = (d: string) => {
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  const assign = async () => {
    if (!selectedUser || !selectedExercise) {
      alert(t("admin.selectUserAndExercise", "Kullanıcı ve egzersiz seçin."));
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
      alert(t("admin.assignSuccess", "Atama başarılı ✅"));
      if (assignmentsOpen && selectedUser) fetchAssignments(selectedUser);
    } else {
      alert(res.error || t("common.error", "Hata"));
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
    if (!res.ok) return alert(res.error || t("common.error", "Hata"));
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
    if (!res.ok) return alert(res.error || t("common.error", "Hata"));
    setShowModal(null);
    await refreshExercises();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin.confirmDeleteExercise", "Bu egzersizi silmek istediğine emin misin?"))) return;
    setCrudLoading(true);
    const res = await fetch(`/api/exercises/delete?id=${encodeURIComponent(id)}`, { method: "DELETE" }).then((r) =>
      r.json()
    );
    setCrudLoading(false);
    if (!res.ok) return alert(res.error || t("common.error", "Hata"));
    await refreshExercises();
  };

  return (
    <AdminShell>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sol: Atama alanı */}
        <div className="rounded-2xl border border-brand-300/30 bg-white shadow-soft p-6">
          <h2 className="text-xl font-semibold mb-4">{t("admin.assign.title", "Egzersiz Atama")}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* User seçimi */}
            <div>
              <label className="block text-sm mb-1 text-text-secondary">{t("admin.assign.user", "Kullanıcı")}</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
                aria-label={t("admin.assign.user", "Kullanıcı")}
              >
                <option value="">{t("common.select", "Seçiniz")}</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Egzersiz seçimi */}
            <div>
              <label className="block text-sm mb-1 text-text-secondary">{t("admin.assign.exercise", "Egzersiz")}</label>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
                aria-label={t("admin.assign.exercise", "Egzersiz")}
              >
                <option value="">{t("common.select", "Seçiniz")}</option>
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
                <label className="block text-sm mb-1 text-text-secondary">{t("admin.assign.sets", "Set")}</label>
                <input
                  type="number"
                  min={1}
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value || "0", 10))}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-text-secondary">{t("admin.assign.reps", "Tekrar")}</label>
                <input
                  type="number"
                  min={1}
                  value={reps}
                  onChange={(e) => setReps(parseInt(e.target.value || "0", 10))}
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-text-secondary">{t("admin.assign.days", "Günler")}</label>
                <div className="flex flex-wrap gap-2">
                  {dayOptions.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => toggleDay(d.key)}
                      className={`px-3 py-1 rounded-lg border ${
                        days.includes(d.key) ? "bg-black text-white" : ""
                      }`}
                      aria-pressed={days.includes(d.key)}
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
                aria-label={t("admin.assign.submit", "Ata")}
              >
                {loadingAssign ? t("admin.assign.submitting", "Atanıyor...") : t("admin.assign.submit", "Ata")}
              </button>
            </div>
          </div>
        </div>

        {/* Sağ: Kullanıcılar tablosu */}
        <div className="rounded-2xl border border-brand-300/30 bg-white shadow-soft p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold">{t("admin.users.title", "Kullanıcılar")}</h2>
            <input
              className="border rounded-lg px-3 py-2 w-full max-w-[240px]"
              placeholder={t("admin.users.searchPlaceholder", "Ara (email, ad)") as string}
              aria-label={t("admin.users.searchPlaceholder", "Ara (email, ad)")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-text-secondary">
                  <th className="py-2 pr-3">{t("admin.users.email", "Email")}</th>
                  <th className="py-2 pr-3">{t("admin.users.name", "Ad")}</th>
                  <th className="py-2 pr-3">{t("admin.users.role", "Rol")}</th>
                  <th className="py-2 pr-3">{t("admin.users.id", "ID")}</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-text-muted">
                      {t("common.loading", "Yükleniyor…")}
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-text-muted">
                      {t("common.noRecords", "Kayıt bulunamadı.")}
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
                      <td className="py-2 pr-3">{u.name || na}</td>
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
              {t("admin.users.selectedUser", "Seçili kullanıcı")}: <span className="font-mono">{selectedUser}</span>
            </div>
          )}
        </div>

        {/* Drawer: Kullanıcı atamaları */}
        {assignmentsOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/30" onClick={() => setAssignmentsOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t("admin.assignments.title", "Atanan Egzersizler")}</h3>
                <button className="px-3 py-1 rounded border" onClick={() => setAssignmentsOpen(false)}>
                  {t("common.close", "Kapat")}
                </button>
              </div>

              {selectedUser && (
                <div className="mb-3 text-xs text-text-secondary">
                  {t("admin.users.userId", "Kullanıcı ID")}: <span className="font-mono">{selectedUser}</span>
                </div>
              )}

              <div className="mb-4">
                <button className="px-3 py-2 rounded border" onClick={() => fetchAssignments(selectedUser)}>
                  {t("common.refresh", "Yenile")}
                </button>
              </div>

              {loadingAssignments ? (
                <div className="text-sm text-text-secondary">{t("common.loading", "Yükleniyor…")}</div>
              ) : assignments.length === 0 ? (
                <div className="text-sm text-text-secondary">
                  {t("admin.assignments.empty", "Bu kullanıcıya henüz egzersiz atanmamış.")}
                </div>
              ) : (
                <ul className="space-y-3">
                  {assignments.map((a: any) => (
                    <li key={a._id} className="border rounded-xl p-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{a.exercise?.title || t("admin.assignments.deleted", "Silinmiş egzersiz")}</div>
                        <div className="text-xs text-text-secondary mt-1">
                          {(a.schedule?.sets ? a.schedule.sets + " " + t("exercises.set", "set") : na)} •{" "}
                          {(a.schedule?.reps ? a.schedule.reps + " " + t("exercises.rep", "tekrar") : na)} •{" "}
                          {renderDays(a.schedule?.days)}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteAssignment(a._id)}
                        className="px-2 py-1 rounded border hover:bg-surface-50"
                      >
                        {t("common.delete", "Sil")}
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
            <h2 className="text-xl font-semibold">{t("admin.exercises.title", "Egzersiz Yönetimi")}</h2>
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
              {t("admin.exercises.new", "Yeni egzersiz")}
            </button>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-text-secondary">
                  <th className="py-2 pr-3">{t("admin.exercises.columns.title", "Başlık")}</th>
                  <th className="py-2 pr-3">{t("admin.exercises.columns.level", "Seviye")}</th>
                  <th className="py-2 pr-3">{t("admin.exercises.columns.tags", "Etiketler")}</th>
                  <th className="py-2 pr-3">{t("admin.exercises.columns.body", "Bölge")}</th>
                  <th className="py-2 pr-3">{t("admin.exercises.columns.slug", "Slug")}</th>
                  <th className="py-2">{t("admin.exercises.columns.actions", "İşlemler")}</th>
                </tr>
              </thead>
              <tbody>
                {exercisesFull.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-text-muted">
                      {t("common.noRecords", "Kayıt yok.")}
                    </td>
                  </tr>
                ) : (
                  exercisesFull.map((x: any) => (
                    <tr key={x._id || x.id} className="border-t">
                      <td className="py-2 pr-3">{x.title}</td>
                      <td className="py-2 pr-3">{renderLevel(x.level)}</td>
                      <td className="py-2 pr-3">{Array.isArray(x.tags) ? x.tags.join(", ") : na}</td>
                      <td className="py-2 pr-3">{Array.isArray(x.bodyParts) ? x.bodyParts.join(", ") : na}</td>
                      <td className="py-2 pr-3">{x.slug || na}</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(x)} className="px-2 py-1 rounded border hover:bg-surface-50">
                            {t("common.edit", "Düzenle")}
                          </button>
                          <button
                            onClick={() => handleDelete(String(x._id || x.id))}
                            className="px-2 py-1 rounded border hover:bg-surface-50"
                          >
                            {t("common.delete", "Sil")}
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
                  {showModal === "create" ? t("admin.exercises.createTitle", "Yeni Egzersiz") : t("admin.exercises.editTitle", "Egzersizi Düzenle")}
                </h3>

                <div className="grid gap-3">
                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder={t("admin.exercises.form.title", "Başlık") as string}
                    value={editing?.title || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, title: e.target.value }))}
                  />
                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder={t("admin.exercises.form.slug", "Slug") as string}
                    value={editing?.slug || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, slug: e.target.value }))}
                  />
                  <textarea
                    className="border rounded-lg px-3 py-2"
                    placeholder={t("admin.exercises.form.description", "Açıklama") as string}
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
                      <option value="easy">{t("levels.easy", "easy")}</option>
                      <option value="medium">{t("levels.medium", "medium")}</option>
                      <option value="hard">{t("levels.hard", "hard")}</option>
                    </select>
                    <input
                      className="border rounded-lg px-3 py-2"
                      placeholder={t("admin.exercises.form.tags", "Etiketler (virgül ile)") as string}
                      value={editing?.tags || ""}
                      onChange={(e) => setEditing((s: any) => ({ ...s, tags: e.target.value }))}
                    />
                    <input
                      className="border rounded-lg px-3 py-2"
                      placeholder={t("admin.exercises.form.body", "Bölge (virgül ile)") as string}
                      value={editing?.bodyParts || ""}
                      onChange={(e) => setEditing((s: any) => ({ ...s, bodyParts: e.target.value }))}
                    />
                  </div>

                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder={t("admin.exercises.form.images", "Görseller (virgül ile URL)") as string}
                    value={editing?.images || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, images: e.target.value }))}
                  />
                  <MediaUploader onUploaded={(urls) => setEditing((s: any) => ({ ...s, images: urls.join(", ") }))} />

                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder={t("admin.exercises.form.video", "YouTube/Video URL") as string}
                    value={editing?.youtube || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, youtube: e.target.value }))}
                  />
                  <textarea
                    className="border rounded-lg px-3 py-2"
                    placeholder={t("admin.exercises.form.text", "Metin içeriği (opsiyonel)") as string}
                    rows={2}
                    value={editing?.text || ""}
                    onChange={(e) => setEditing((s: any) => ({ ...s, text: e.target.value }))}
                  />
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button className="px-3 py-2 rounded-lg border" onClick={() => setShowModal(null)}>
                    {t("common.cancel", "Vazgeç")}
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
                    {t("common.save", "Kaydet")}
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

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? "de", ["common"])),
    },
  };
};
