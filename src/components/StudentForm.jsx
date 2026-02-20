import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentForm({ initialData, onSubmit, isEdit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    phone: "",
    attendance: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Information Technology",
    "Chemical",
    "Biotechnology",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = "Student ID is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    const att = Number(formData.attendance);
    if (isNaN(att) || att < 0 || att > 100) {
      newErrors.attendance = "Attendance must be between 0 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await onSubmit(formData);
        navigate("/");
      } catch {
        // Error is handled by the parent page
      }
    }
  };

  const inputClass = (field) =>
    `retro-input w-full ${errors[field] ? "!bg-[#ffcccc]" : ""}`;

  return (
    <form onSubmit={handleSubmit}>
      <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <tbody>
          {/* Student ID */}
          <tr>
            <td className="text-right pr-3 align-top" style={{ width: "140px" }}>
              <label className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>
                Student ID:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled={isEdit}
                placeholder="e.g. STU004"
                className={`${inputClass("id")} ${isEdit ? "!bg-[#e0e0e0]" : ""}`}
                style={{ width: "200px" }}
              />
              {errors.id && <p className="text-[10px] text-[#ff0000] mt-0.5">⚠ {errors.id}</p>}
            </td>
          </tr>

          {/* Name */}
          <tr>
            <td className="text-right pr-3 align-top">
              <label className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>
                Full Name:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={inputClass("name")}
                style={{ width: "280px" }}
              />
              {errors.name && <p className="text-[10px] text-[#ff0000] mt-0.5">⚠ {errors.name}</p>}
            </td>
          </tr>

          {/* Email */}
          <tr>
            <td className="text-right pr-3 align-top">
              <label className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>
                E-mail:
              </label>
            </td>
            <td>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@college.edu"
                className={inputClass("email")}
                style={{ width: "280px" }}
              />
              {errors.email && <p className="text-[10px] text-[#ff0000] mt-0.5">⚠ {errors.email}</p>}
            </td>
          </tr>

          {/* Department */}
          <tr>
            <td className="text-right pr-3 align-top">
              <label className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>
                Department:
              </label>
            </td>
            <td>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={inputClass("department")}
                style={{ width: "220px" }}
              >
                <option value="">-- Select Dept --</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && <p className="text-[10px] text-[#ff0000] mt-0.5">⚠ {errors.department}</p>}
            </td>
          </tr>

          {/* Phone */}
          <tr>
            <td className="text-right pr-3 align-top">
              <label className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>
                Phone No.:
              </label>
            </td>
            <td>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className={inputClass("phone")}
                style={{ width: "200px" }}
              />
              {errors.phone && <p className="text-[10px] text-[#ff0000] mt-0.5">⚠ {errors.phone}</p>}
            </td>
          </tr>

          {/* Attendance */}
          <tr>
            <td className="text-right pr-3 align-top">
              <label className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>
                Attendance %:
              </label>
            </td>
            <td>
              <input
                type="number"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                min="0"
                max="100"
                placeholder="e.g. 85"
                className={inputClass("attendance")}
                style={{ width: "100px" }}
              />
              {/* Retro progress bar */}
              <div
                className="mt-1 h-3 border border-[#808080]"
                style={{
                  width: "200px",
                  background: `linear-gradient(90deg, ${
                    Number(formData.attendance) >= 75
                      ? "#00cc00"
                      : Number(formData.attendance) >= 50
                      ? "#cccc00"
                      : "#cc0000"
                  } ${Math.min(100, Math.max(0, Number(formData.attendance) || 0))}%, #c0c0c0 ${Math.min(100, Math.max(0, Number(formData.attendance) || 0))}%)`,
                }}
              />
              <p className="text-[10px] mt-0.5" style={{
                fontFamily: "Verdana, sans-serif",
                color: Number(formData.attendance) >= 75 ? "#006600" : Number(formData.attendance) >= 50 ? "#666600" : "#cc0000"
              }}>
                {Number(formData.attendance) >= 75
                  ? "✅ Good attendance"
                  : Number(formData.attendance) >= 50
                  ? "⚠️ Needs improvement"
                  : "❌ Low attendance"}
              </p>
              {errors.attendance && <p className="text-[10px] text-[#ff0000] mt-0.5">⚠ {errors.attendance}</p>}
            </td>
          </tr>

          {/* Separator */}
          <tr>
            <td colSpan="2">
              <hr style={{ border: "1px inset #c0c0c0" }} />
            </td>
          </tr>

          {/* Buttons */}
          <tr>
            <td></td>
            <td className="pt-1 space-x-2">
              <button
                type="submit"
                className="retro-btn retro-btn-primary text-xs"
              >
                {isEdit ? "💾 Update Record" : "💾 Save Record"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="retro-btn text-xs"
              >
                ❌ Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
