const API_BASE = "/api/students";

export async function fetchStudents() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

export async function fetchStudent(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Student not found");
  return res.json();
}

export async function createStudent(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentId: data.id,
      name: data.name,
      email: data.email,
      department: data.department,
      phone: data.phone,
      attendance: data.attendance ?? 0,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to add student");
  }
  return res.json();
}

export async function updateStudent(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      department: data.department,
      phone: data.phone,
      attendance: data.attendance ?? 0,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update student");
  }
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete student");
  return res.json();
}
