import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// @ts-ignore ✅ bỏ qua kiểm tra kiểu Supabase
import { supabase } from "./supabaseClient";

// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore ✅ bỏ qua lỗi Login
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState<any>(null); // 👈 dùng any cho dễ
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();

    // 👇 thêm kiểu any cho event & session
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
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
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
      </Routes>
    </BrowserRouter>
  );
}
