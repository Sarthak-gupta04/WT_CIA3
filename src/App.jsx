import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Navbar from "./components/Navbar";
import StudentGuide from "./components/StudentGuide";
import HomePage from "./pages/HomePage";
import AddStudentPage from "./pages/AddStudentPage";
import EditStudentPage from "./pages/EditStudentPage";

function App() {
  return (
    <Router>
      <StudentProvider>
        <div className="min-h-screen" style={{ background: "#336699", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Crect width='1' height='1'/%3E%3C/g%3E%3C/svg%3E\")" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddStudentPage />} />
            <Route path="/edit/:id" element={<EditStudentPage />} />
          </Routes>
          <StudentGuide />
        </div>
      </StudentProvider>
    </Router>
  );
}

export default App;
