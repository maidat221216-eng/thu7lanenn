import "./assets/css/main.css";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // 👈 quay lại trang login
  };

  return (
    <div>
      <header>
        <div id="divheader" className="header1">
          <div id="banner" className="banner1">
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

            {/* ✅ Logo từ link online */}
            <div id="logo" className="logo1">
              <img
                src="https://upload.vmnghia.id.vn/uploads/files-1762486097502-243307491.png"
                width="548"
                alt="Logo"
              />
            </div>

            <div id="divtimkiem" style={{ width: "300px" }}>
              Phần tìm kiếm
            </div>

            {/* 👇 Nút đăng xuất */}
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

      <main id="container" className="container">
        <Outlet />
      </main>

      <footer className="footer1">© 2025 - HCE</footer>
    </div>
  );
};

export default Layout;
