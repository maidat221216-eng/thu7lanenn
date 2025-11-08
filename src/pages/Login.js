import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else alert("Đăng ký thành công 🎉! Vui lòng kiểm tra email xác nhận.");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
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
        backgroundAttachment: "fixed", // giống layout
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Logo trên cùng */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src="https://upload.vmnghia.id.vn/uploads/files-1762486097502-243307491.png"
          alt="Logo"
          width="348"
        />
      </div>

      {/* Form đăng nhập/đăng ký */}
      <div
        className="login-container"
        style={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // giống main content layout
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

        {error && <p style={{ color: "red", marginTop: "10px" }}>⚠️ {error}</p>}

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
  );
};

export default Login;
