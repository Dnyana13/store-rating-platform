import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="w-100">
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;