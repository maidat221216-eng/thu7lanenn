import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // chú ý: đường dẫn ra ngoài src/pages/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Gọi API Supabase để đăng nhập
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        alert("Đăng nhập thành công ✅");
        navigate("/"); // chuyển về trang chính sau khi đăng nhập
      }
    } catch (err) {
      setError("Đã xảy ra lỗi, vui lòng thử lại!");
      console.error(err);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Đăng nhập</h2>

      <form onSubmit={handleLogin}>
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
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Đăng nhập
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>⚠️ {error}</p>}
    </div>
  );
};

export default Login;
