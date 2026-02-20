import { useState } from "react";
import { useStudents } from "../context/StudentContext";
import StudentForm from "../components/StudentForm";

export default function AddStudentPage() {
  const { addStudent } = useStudents();
  const [apiError, setApiError] = useState(null);

  const handleAdd = async (data) => {
    try {
      setApiError(null);
      await addStudent(data);
    } catch (err) {
      setApiError(err.message);
      throw err; // re-throw so the form knows submission failed
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3 py-4">
      <div className="retro-panel p-1">
        {/* Title bar */}
        <div className="px-2 py-1" style={{ background: "linear-gradient(90deg, #000080, #1084d0)" }}>
          <h1 className="text-sm font-bold text-white m-0" style={{ fontFamily: "Verdana, sans-serif" }}>
            📝 Add New Student Record
          </h1>
        </div>
        <div className="bg-[#d4d0c8] p-4">
          <p className="text-xs text-[#808080] mb-3" style={{ fontFamily: "Verdana, sans-serif" }}>
            Fill in the fields below and click "Save Record" to add a new student.
          </p>
          <hr className="mb-3" style={{ border: "1px inset #c0c0c0" }} />
          {apiError && (
            <div className="mb-3 p-2 text-xs font-bold text-[#ff0000]" style={{ border: "2px inset #c0c0c0", background: "#ffcccc", fontFamily: "Verdana, sans-serif" }}>
              ⚠ Error: {apiError}
            </div>
          )}
          <StudentForm onSubmit={handleAdd} isEdit={false} />
        </div>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-[#c0c0c0]" style={{ fontFamily: "Verdana, sans-serif" }}>[ <a href="/" className="retro-link text-[10px]">⬅ Back to Directory</a> ]</span>
      </div>
    </div>
  );
}
