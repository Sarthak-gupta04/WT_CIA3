export default function DeleteModal({ student, onConfirm, onCancel }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="retro-panel p-1 max-w-sm w-full mx-4">
        {/* Title bar like Windows 2000 */}
        <div className="px-2 py-1 flex items-center justify-between" style={{ background: "linear-gradient(90deg, #000080, #1084d0)" }}>
          <span className="text-white text-xs font-bold" style={{ fontFamily: "Verdana, sans-serif" }}>⚠️ Confirm Deletion</span>
          <button
            onClick={onCancel}
            className="text-white text-xs font-bold px-1 hover:bg-[#c0c0c0] hover:text-black"
            style={{ border: "1px outset #aaa", background: "#c0c0c0", color: "#000", fontSize: "10px", lineHeight: "1" }}
          >
            ✕
          </button>
        </div>
        {/* Content */}
        <div className="bg-[#d4d0c8] p-4">
          <div className="flex gap-3 items-start">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="text-xs text-[#000] mb-1" style={{ fontFamily: "Verdana, sans-serif" }}>
                Are you sure you want to <b>permanently delete</b> this student record?
              </p>
              <div className="retro-input p-1 text-[10px] mt-1" style={{ background: "#f0f0f0" }}>
                <b>Name:</b> {student.name}<br/>
                <b>ID:</b> {student.id}
              </div>
              <p className="text-[10px] text-[#cc0000] mt-1 font-bold">This action cannot be undone!</p>
            </div>
          </div>
          <hr className="my-3" style={{ border: "1px inset #c0c0c0" }} />
          <div className="text-center space-x-2">
            <button
              onClick={() => onConfirm(student.id)}
              className="retro-btn retro-btn-danger text-xs"
            >
              🗑️ Yes, Delete
            </button>
            <button
              onClick={onCancel}
              className="retro-btn text-xs"
            >
              ❌ No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
