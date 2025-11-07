import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";

// @ts-ignore
import ProductDetail from "./ProductDetail";

// @ts-ignore
import ListProducts from "./ListProducts";

// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";

// @ts-ignore
import Trang2 from "./Trang2";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  // return <Layout />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
