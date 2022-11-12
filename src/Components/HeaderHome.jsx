import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ACCESS_TOKEN, setting, USER_LOGIN } from '../util/config';
export default function HomeHeader() {
  const { userProfile } = useSelector(state => state.userReducer)
  const renderLogin = () => {
    if (userProfile.name) {
      return <>
        <div className="row">
          <div className="col-7">
            <NavLink to='/profile' className="nav-link"> Hello! {userProfile.name}</NavLink>
          </div>
          <div className="col-5">
            <button className="nav-link btn" style={{ background: 'none', border: 'none' }} onClick={() => {
              setting.eraseCookie(ACCESS_TOKEN, 0);
              localStorage.removeItem(USER_LOGIN)
              localStorage.removeItem(ACCESS_TOKEN)
              // sau khi đăng xuất xong chuyển về trang login đồng thời reload lại page clear redux
              window.location.href = '/login';
            }}> Đăng xuất</button>
          </div>
        </div>
      </>
    } else {
      return <NavLink className="nav-link" to="/login">Login</NavLink>
    }
  }
  return (
    <div>
      <nav className=" navbar navbar-expand-sm navbar-dark bg-dark d-flex flex-row justify-content-around">
        <NavLink className="navbar-brand btn" style={{border:'none'}} to='/'><img  src="./img/image 3.png" alt="..." /></NavLink>
        <button className="navbar-toggler d-lg-none " type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
          <form className="d-flex my-2 text-white">
            {/* <button className="btn my-2 text-white" type="submit"><i class="fas fa-search"></i>Search</button>
            <button className="btn my-2 text-white" type="submit" ><i class="fa-solid fa-cart-shopping"></i>(1)</button> */}
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" to='/search' aria-current="page"><i class="fas fa-search"></i>Search <span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link m-0 p-0 " to='/cart' aria-current="page"><button className="btn p-0 my-2 text-white" style={{border:'none'}} type="submit" ><i class="fa-solid fa-cart-shopping m-0 p-0"></i>(1)</button><span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to='/register' aria-current="page">Register<span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              {renderLogin()}
            </li>
          </ul>
          </form>
        </div>
        <br />   
      </nav>
      <nav className="navbar navbar-expand-sm navbar-dark bg-white">
      <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item text-dark">
              <NavLink className="nav-link active text-dark" to='/home' aria-current="page">Home <span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item text-dark">
              <NavLink className="nav-link text-dark" to='' aria-current="page">Men <span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item text-dark">
              <NavLink className="nav-link text-dark" to='' aria-current="page">Woman <span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item text-dark">
              <NavLink className="nav-link text-dark" to='' aria-current="page">Kid <span className="visually-hidden">(current)</span></NavLink>
            </li>
            <li className="nav-item text-dark">
              <NavLink className="nav-link text-dark" to='' aria-current="page">Sport <span className="visually-hidden">(current)</span></NavLink>
            </li>
          </ul> 
        </div>
      </nav>
    </div>

  )
}
