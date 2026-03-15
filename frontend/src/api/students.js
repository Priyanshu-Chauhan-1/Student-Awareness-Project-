import { getJson, postJson } from "./http";

function buildQuery(params = {}) {
  const sp = new URLSearchParams();

  if (params.q) sp.set("q", params.q);
  if (params.department && params.department !== "ALL") sp.set("department", params.department);
  if (params.year && params.year !== "ALL") sp.set("year", String(params.year));
  if (params.sortBy) sp.set("sortBy", params.sortBy);
  if (params.sortDir) sp.set("sortDir", params.sortDir);

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function listStudents(params) {
  return getJson(`/api/students${buildQuery(params)}`);
}

export function createStudent(student) {
  return postJson("/api/students", student);
}

export async function updateStudent(id, student) {
  const res = await fetch(`/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Update failed: ${res.status} ${body}`);
  }
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Delete failed: ${res.status} ${body}`);
  }
}