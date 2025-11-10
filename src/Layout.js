import "./assets/css/main.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const isHome = location.pathname === "/"; // kiểm tra trang chủ

  return (
    <div
      style={{
        backgroundImage:
          'url("https://upload.vmnghia.id.vn/uploads/files-1762585365893-354464584.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header>
        <div id="divheader" className="header1">
          <div
            id="banner"
            className="banner1"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              padding: "10px 20px",
            }}
          >
            {/* Menu hình ảnh */}
            <div
              style={{
                display: "flex",
                gap: "50px",
                justifyContent: "flex-start",
              }}
            >
              {/* TRANG CHỦ */}
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762593535768-919091275.png"
                alt="TRANG CHỦ"
                width="50"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              />

              {/* EGOV */}
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762594264284-282891578.png"
                alt="SHOP"
                width="40"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/trang1")}
              />

              {/* SINH VIÊN */}
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762594374581-731830969.webp"
                alt="hero"
                width="50"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/trang2")}
              />

              {/* Instagram */}
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762588242676-482434.png"
                alt="Instagram"
                width="50"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("https://www.instagram.com/darkmyy_/", "_blank")
                }
              />
            </div>

            {/* Logo chính */}
            <div
              id="logo"
              className="logo1"
              style={{
                position: "absolute",
                top: "20px",
                left: "55%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762486097502-243307491.png"
                width="320"
                alt="Logo"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "auto",
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

      {/* Main Content */}
      <main
        id="container"
        className="container"
        style={{
          flexGrow: 1,
        }}
      >
        {!isHome && <Outlet />}
      </main>

      {/* Footer */}
      <footer
        className="footer1"
        style={{ textAlign: "center", padding: "10px" }}
      >
        © 2025 - darkmyy_
      </footer>
    </div>
  );
};

export default Layout;
