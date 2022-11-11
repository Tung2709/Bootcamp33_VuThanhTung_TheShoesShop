import React from "react";
import ReactDOM from "react-dom/client";
import 'antd/dist/antd.css';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Detail from "./Pages/Detail/Detail";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Search from "./Pages/Search/Search";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
// cấu hình history ( chuyển hướng trang mà không dùng hook)
import { createBrowserHistory } from "history";
import ResponsiveItem from "./HOC/Responsive/ResponsiveItem";
import Home_Mobile from "./Pages/Home/Home_Mobile";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<ResponsiveItem component={Home} mobileComponent={Home_Mobile} />}></Route>
          {/* <Route index element={<Home />}></Route> */}
          <Route path="cart" element={<Cart />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="*" element={<Navigate to={""} />}></Route>
        </Route>
        <Route path="user" element={<UserTemplate />}>
          <Route index element={<Login />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="*" element={<Navigate to={""} />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
