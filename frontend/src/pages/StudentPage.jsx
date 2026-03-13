import { useEffect, useState } from "react";
import { createStudent, deleteStudent, listStudents } from "../api/students";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", department: "", year: "" });

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

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        department: form.department.trim(),
        year: Number(form.year),
      };

      if (!payload.name || !payload.email || !payload.department || !payload.year) {
        throw new Error("All fields are required");
      }

      await createStudent(payload);
      setForm({ name: "", email: "", department: "", year: "" });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    setError("");
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      setError(e.message);
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
          <h3 style={{ marginTop: 0 }}>Add Student</h3>

          <div style={{ display: "grid", gap: 10 }}>
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
              placeholder="Year (1-4)"
              value={form.year}
              onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
              style={{ padding: 8 }}
            />

            <button disabled={saving} style={{ padding: 10 }}>
              {saving ? "Saving..." : "Save"}
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
                {["ID", "Name", "Email", "Dept", "Year", "Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: 8 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.id}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.name}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.email}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.department}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>{s.year}</td>
                  <td style={{ padding: 8, borderBottom: "1px solid #f5f5f5" }}>
                    <button onClick={() => onDelete(s.id)} style={{ padding: "6px 10px" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && students.length === 0 ? (
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