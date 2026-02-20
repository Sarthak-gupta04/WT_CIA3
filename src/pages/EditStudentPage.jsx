import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import StudentForm from "../components/StudentForm";

export default function EditStudentPage() {
  const { id } = useParams();
  const { getStudent, updateStudent, loading } = useStudents();
  const [apiError, setApiError] = useState(null);
  const student = getStudent(id);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="retro-panel inline-block p-6">
          <p className="retro-blink text-[#000080] font-bold" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            ⏳ Loading record...
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return <Navigate to="/" replace />;
  }

  const handleUpdate = async (data) => {
    try {
      setApiError(null);
      await updateStudent(data);
    } catch (err) {
      setApiError(err.message);
      throw err;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3 py-4">
      <div className="retro-panel p-1">
        {/* Title bar */}
        <div className="px-2 py-1" style={{ background: "linear-gradient(90deg, #000080, #1084d0)" }}>
          <h1 className="text-sm font-bold text-white m-0" style={{ fontFamily: "Verdana, sans-serif" }}>
            ✏️ Edit Student Record - {student.id}
          </h1>
        </div>
        <div className="bg-[#d4d0c8] p-4">
          <p className="text-xs text-[#808080] mb-3" style={{ fontFamily: "Verdana, sans-serif" }}>
            Modify the fields below and click "Update Record" to save changes.
          </p>
          <hr className="mb-3" style={{ border: "1px inset #c0c0c0" }} />
          {apiError && (
            <div className="mb-3 p-2 text-xs font-bold text-[#ff0000]" style={{ border: "2px inset #c0c0c0", background: "#ffcccc", fontFamily: "Verdana, sans-serif" }}>
              ⚠ Error: {apiError}
            </div>
          )}
          <StudentForm
            initialData={student}
            onSubmit={handleUpdate}
            isEdit={true}
          />
        </div>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-[#c0c0c0]" style={{ fontFamily: "Verdana, sans-serif" }}>[ <a href="/" className="retro-link text-[10px]">⬅ Back to Directory</a> ]</span>
      </div>
    </div>
  );
}
