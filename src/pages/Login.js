import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  // Lấy slide từ Supabase
  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("slides")
        .select("*")
        .order("id", { ascending: true });
      if (error) console.error("Lỗi khi lấy slide:", error);
      else setSlides(data);
    };
    fetchSlides();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else alert("Đăng ký thành công 🎉! Vui lòng kiểm tra email xác nhận.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) setError(error.message);
        else {
          alert("Đăng nhập thành công ✅");
          navigate("/");
        }
      }
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại!");
      console.error(err);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          'url("https://upload.vmnghia.id.vn/uploads/files-1762585365893-354464584.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Menu trên cùng */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          position: "absolute",
          top: "20px",
          left: "20px",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <img
          src="https://upload.vmnghia.id.vn/uploads/files-1762593535768-919091275.png"
          alt="TRANG CHỦ"
          width="50"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <img
          src="https://upload.vmnghia.id.vn/uploads/files-1762594264284-282891578.png"
          alt="EGOV"
          width="40"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/trang1")}
        />
        <img
          src="https://upload.vmnghia.id.vn/uploads/files-1762594374581-731830969.webp"
          alt="Sinh viên"
          width="50"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/trang2")}
        />
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

      {/* Logo chính ở giữa */}
      <div
        id="logo"
        className="logo1"
        style={{
          position: "absolute",
          top: "20px",
          left: "55%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <img
          src="https://upload.vmnghia.id.vn/uploads/files-1762486097502-243307491.png"
          width="320"
          alt="Logo"
        />
      </div>

      {/* Nút Login góc trên phải */}
      <button
        onClick={() => {
          setShowForm(true);
          setIsSignup(false);
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        Đăng Nhập
      </button>

      {/* Slider hiển thị giữa trang */}
      {slides.length > 0 && (
        <div style={{ maxWidth: 800, margin: "150px auto" }}>
          <Slider {...sliderSettings}>
            {slides.map((slide) => (
              <div key={slide.id}>
                <a
                  href={slide.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={slide.image_url}
                    alt={slide.title || "slide"}
                    style={{ width: "100%", borderRadius: "15px" }}
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Overlay + Form login */}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 400,
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "20px", color: "#333" }}>
              {isSignup ? "Đăng ký tài khoản" : "Đăng nhập"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Nhập email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  display: "block",
                  width: "100%",
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  display: "block",
                  width: "100%",
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  backgroundColor: isSignup ? "#28a745" : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {isSignup ? "Đăng ký" : "Đăng nhập"}
              </button>
            </form>

            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>⚠️ {error}</p>
            )}

            <p style={{ marginTop: "15px" }}>
              {isSignup ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {isSignup ? "Đăng nhập" : "Đăng ký ngay"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
