import { useEffect, useMemo, useState } from "react";
import { createStudent, deleteStudent, listStudents, updateStudent } from "../api/students";

const emptyForm = { name: "", email: "", department: "", year: "" };

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const sorted = useMemo(() => {
    return [...students].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }, [students]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function startEdit(student) {
    setEditingId(student.id);
    setForm({
      name: student.name ?? "",
      email: student.email ?? "",
      department: student.department ?? "",
      year: String(student.year ?? ""),
    });
  }

  function validate(payload) {
    if (!payload.name.trim()) return "Name is required";
    if (!payload.email.trim()) return "Email is required";
    if (!payload.department.trim()) return "Department is required";
    if (payload.year === "" || payload.year === null || payload.year === undefined) return "Year is required";
    const y = Number(payload.year);
    if (!Number.isInteger(y) || y < 1 || y > 6) return "Year must be a number between 1 and 6";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      email: form.email,
      department: form.department,
      year: Number(form.year),
    };

    const msg = validate(payload);
    if (msg) {
      setSaving(false);
      setError(msg);
      return;
    }

    try {
      if (editingId === null) {
        await createStudent({
          name: payload.name.trim(),
          email: payload.email.trim(),
          department: payload.department.trim(),
          year: payload.year,
        });
      } else {
        await updateStudent(editingId, {
          name: payload.name.trim(),
          email: payload.email.trim(),
          department: payload.department.trim(),
          year: payload.year,
        });
      }

      startCreate();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    setDeletingId(id);
    setError("");
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingId === id) startCreate();
    } catch (e) {
      setError(e.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Students</h2>

      {error ? (
        <div style={{ background: "#fee", border: "1px solid #f99", padding: 10, borderRadius: 8 }}>
          {error}
        </div>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16, marginTop: 12 }}>
        <form onSubmit={onSubmit} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>{editingId === null ? "Add Student" : `Edit Student (#${editingId})`}</h3>
            {editingId !== null ? (
              <button type="button" onClick={startCreate} style={{ padding: "6px 10px" }}>
                Cancel
              </button>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              style={{ padding: 8 }}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              style={{ padding: 8 }}
            />
            <input
              placeholder="Department (CSE/IT/ECE)"
              value={form.department}
              onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
              style={{ padding: 8 }}
            />
            <input
              placeholder="Year (1-6)"
              value={form.year}
              onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
              style={{ padding: 8 }}
            />

            <button disabled={saving} style={{ padding: 10 }}>
              {saving ? "Saving..." : editingId === null ? "Save" : "Update"}
            </button>
          </div>
        </form>

        <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Student List</h3>
            <button onClick={load} disabled={loading} style={{ padding: "6px 10px" }}>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
            <thead>
              <tr>
                {["ID", "Name", "Email", "Dept", "Year", "Actions"].map((h) => (
                  <th key={h} style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: 8 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sorted.map((s) => (
                <tr key={s.id} style={editingId === s.id ? { background: "#f8fafc" } : undefined}>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.id}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.name}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.email}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.department}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.year}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => startEdit(s)} style={{ padding: "6px 10px" }}>
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(s.id)}
                        disabled={deletingId === s.id}
                        style={{ padding: "6px 10px" }}
                      >
                        {deletingId === s.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && sorted.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 10 }}>
                    No students found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}