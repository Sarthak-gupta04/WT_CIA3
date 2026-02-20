import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import DeleteModal from "../components/DeleteModal";

export default function HomePage() {
  const { students, deleteStudent, loading, error } = useStudents();
  const [search, setSearch] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = students.filter((s) => {
    const matchesGeneral =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesName =
      !nameFilter ||
      s.name.toLowerCase().includes(nameFilter.toLowerCase());
    return matchesGeneral && matchesName;
  });

  const handleDelete = async (id) => {
    await deleteStudent(id);
    setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="retro-panel inline-block p-6">
          <p className="retro-blink text-[#000080] font-bold text-lg" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            ⏳ Loading student records...
          </p>
          <p className="text-xs text-[#808080] mt-2" style={{ fontFamily: "Verdana, sans-serif" }}>
            Please wait while the database loads...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="retro-panel inline-block p-6">
          <p className="text-xl mb-2">🚫</p>
          <h3 className="text-[#ff0000] font-bold" style={{ fontFamily: "'Comic Sans MS', cursive" }}>!! CONNECTION ERROR !!</h3>
          <p className="text-xs text-[#000] mt-1" style={{ fontFamily: "Verdana, sans-serif" }}>{error}</p>
          <hr className="my-2" style={{ border: "1px inset #c0c0c0" }} />
          <p className="text-[10px] text-[#808080]">Try refreshing the page or check your internet connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 py-4">
      {/* Header Section - retro style */}
      <div className="retro-panel p-3 mb-3">
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <h1 className="text-xl font-bold text-[#000080] m-0" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
                  📋 Students Directory
                </h1>
                <p className="text-xs text-[#808080] mt-0.5" style={{ fontFamily: "Verdana, sans-serif" }}>
                  Total students in database: <span className="retro-counter">{students.length}</span>
                </p>
              </td>
              <td className="text-right align-middle">
                <Link
                  to="/add"
                  className="retro-btn retro-btn-primary text-xs no-underline"
                >
                  📝 Add New Student
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Search / Filter Bar - retro */}
      <div className="retro-panel p-2 mb-3">
        <table>
          <tbody>
            <tr>
              <td className="pr-1">
                <span className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>🔍 Search:</span>
              </td>
              <td className="pr-3">
                <input
                  type="text"
                  placeholder="Search all fields..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="retro-input"
                  style={{ width: "200px" }}
                />
              </td>
              <td className="pr-1">
                <span className="text-xs font-bold text-[#000080]" style={{ fontFamily: "Verdana, sans-serif" }}>👤 Name:</span>
              </td>
              <td className="pr-3">
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="retro-input"
                  style={{ width: "180px" }}
                />
              </td>
              <td>
                {(search || nameFilter) && (
                  <button
                    onClick={() => { setSearch(""); setNameFilter(""); }}
                    className="retro-btn text-[10px]"
                  >
                    ✕ Clear
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="retro-panel p-6 text-center">
          <p className="text-3xl mb-2">📭</p>
          <h3 className="text-sm font-bold text-[#000080]" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            No students found!
          </h3>
          <hr className="my-2" style={{ border: "1px inset #c0c0c0" }} />
          <p className="text-xs text-[#808080]" style={{ fontFamily: "Verdana, sans-serif" }}>
            {search || nameFilter
              ? "Try adjusting your search query."
              : "Click 'Add New Student' to get started!"}
          </p>
        </div>
      ) : (
        <div className="retro-panel p-2">
          <div className="overflow-x-auto">
            <table className="retro-table w-full">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Dept.</th>
                  <th>Phone</th>
                  <th>Attendance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id}>
                    <td className="font-bold text-[#000080]">
                      {student.id}
                    </td>
                    <td className="font-bold">
                      {student.name}
                    </td>
                    <td>
                      <a href={`mailto:${student.email}`} className="retro-link text-xs">
                        {student.email}
                      </a>
                    </td>
                    <td className="text-xs text-center">
                      {student.department}
                    </td>
                    <td className="text-xs">
                      {student.phone}
                    </td>
                    <td className="text-center">
                      <div className="inline-flex items-center gap-1">
                        {/* Old-school bar made with table cells */}
                        <div
                          className="h-3 border border-[#808080]"
                          style={{
                            width: "60px",
                            background: `linear-gradient(90deg, ${
                              student.attendance >= 75
                                ? "#00cc00"
                                : student.attendance >= 50
                                ? "#cccc00"
                                : "#cc0000"
                            } ${student.attendance || 0}%, #c0c0c0 ${student.attendance || 0}%)`,
                          }}
                        />
                        <span className="text-[10px] font-bold" style={{
                          color: student.attendance >= 75 ? "#006600" : student.attendance >= 50 ? "#666600" : "#cc0000",
                          fontFamily: "'Courier New', monospace"
                        }}>
                          {student.attendance ?? 0}%
                        </span>
                      </div>
                    </td>
                    <td className="text-center whitespace-nowrap">
                      <Link
                        to={`/edit/${student.id}`}
                        className="retro-btn retro-btn-warning text-[10px] no-underline mr-1"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(student)}
                        className="retro-btn retro-btn-danger text-[10px]"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-2 text-[10px] text-[#808080]" style={{ fontFamily: "Verdana, sans-serif" }}>
            Showing {filtered.length} of {students.length} records
          </div>
        </div>
      )}

      {/* Footer area */}
      <div className="text-center mt-4 text-[10px] text-[#ffcc00]" style={{ fontFamily: "Verdana, sans-serif" }}>
        ═══════════════════════════════════════<br/>
        <span className="text-[#c0c0c0]">© 2003-2026 Student Management System. All Rights Reserved.</span><br/>
        <span className="text-[#808080]">You are visitor number </span>
        <span className="retro-counter text-[10px]">{String(Math.floor(Math.random() * 90000) + 10000).padStart(6, '0')}</span><br/>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt=""
          width="1"
          height="5"
        />
        <br />
        <span className="text-[#808080]">📧 webmaster@studentdb.edu</span>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        student={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
