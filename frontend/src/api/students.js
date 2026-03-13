import { getJson, postJson } from "./http";

export function listStudents() {
  return getJson("/api/students");
}

export function createStudent(student) {
  return postJson("/api/students", student);
}

export async function deleteStudent(id) {
  const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Delete failed: ${res.status} ${body}`);
  }
}