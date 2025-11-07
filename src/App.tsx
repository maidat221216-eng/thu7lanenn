import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Layout from "./Layout";
import Trang1 from "./Trang1";
import Chitietsanpham from "./Chitietsanpham";
import ProductDetail from "./ProductDetail";
import ListProducts_SP from "./ListProducts_SP";
import Trang2 from "./Trang2";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Thêm dòng này

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();

    // Lắng nghe sự thay đổi trạng thái đăng nhập
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <BrowserRouter>
      <Routes>
        {/* 🧩 Route Đăng nhập */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />

        {/* 🧩 Route Đăng ký */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />

        {/* 🧩 Route chính - cần đăng nhập */}
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<ListProducts_SP />} />
          <Route path="trang1" element={<Trang1 />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          <Route path="trang2" element={<Trang2 />} />
        </Route>

        {/* 🧩 Mặc định điều hướng */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
