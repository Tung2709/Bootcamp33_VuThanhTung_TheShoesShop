import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import Detail from './Pages/Detail/Detail';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';
import Search from './Pages/Search/Search';
import './index.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
 <Routes>
    <Route path='' element={<HomeTemplate/>}>
        <Route index element={<Home/>}></Route>
        <Route path='cart' element={<Cart/>}></Route>
        <Route path='detail'>
            <Route path=':id' element={<Detail/>}></Route>
        </Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='search' element={<Search/>}></Route>
        <Route path='*' element={<Navigate to={""}/>}></Route>
    </Route>
 </Routes>
 </BrowserRouter>
);

