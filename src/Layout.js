import "./assets/css/main.css";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://upload.vmnghia.id.vn/uploads/files-1762585365893-354464584.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // ✅ giữ background cố định
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header>
        <div id="divheader" className="header1">
          <div id="banner" className="banner1" style={{ position: "relative" }}>
            {/* Menu */}
            <div id="topleft">
              <ul className="ul1">
                <li>
                  <a href="/">TRANG CHỦ</a>
                </li>
                <li>
                  <a href="/trang1">EGOV</a>
                </li>
                <li>
                  <a href="/trang2">SINH VIÊN</a>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div id="logo" className="logo1">
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762486097502-243307491.png"
                width="548"
                alt="Logo"
              />
            </div>

            {/* Search */}
            <div id="divtimkiem" style={{ width: "300px" }}>
              Phần tìm kiếm
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main
        id="container"
        className="container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "10px",
          margin: "20px",
          padding: "20px",
          flexGrow: 1,
          overflowY: "auto", // ✅ cho phép scroll
          maxHeight: "calc(100vh - 150px)", // giới hạn chiều cao
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="footer1"
        style={{ textAlign: "center", padding: "10px" }}
      >
        © 2025 - HCE
      </footer>
    </div>
  );
};

export default Layout;
