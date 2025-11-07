import "./assets/css/main.css";
import anhlogo from "./assets/images//Ten-truong-do-1000x159.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <html>
      <header>
        <div id="divheader" class="header1">
          <div id="banner" class="banner1">
            <div id="topleft">
              <ul class="ul1">
                <li>
                  <a href="/#">TRANG CHỦ</a>
                </li>
                <li>
                  <a href="/trang1">EGOV</a>
                </li>
                <li>
                  <a href="/trang2">SINH VIÊN</a>
                </li>
              </ul>
            </div>
            <div id="logo" class="logo1">
              <img src={anhlogo} width="548" />
            </div>
            <div id="divtimkiem" style={{ width: "300px" }}>
              Phần tìm kiếm
            </div>
          </div>
          <div id="divmenu" class="menu">
            333
          </div>
        </div>
      </header>
      <body>
        <div id="container" class="container">
          <Outlet />
        </div>
      </body>
      <footer></footer>
    </html>
  );
};

export default Layout;
