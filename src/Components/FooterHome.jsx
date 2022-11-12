import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeFooter() {
  return (
    <div className='footer'>
      <div className="footer-detail">
        <div className="row">
          <div className="col-4">
            <h3>GET HELP</h3>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/">Nike</NavLink>
              </li>
              <li>
                <NavLink to="/">Adidas</NavLink>
              </li>
              <li>
                <NavLink to="/">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <h3>SUPPORT</h3>
            <ul>
              <li>
                <NavLink to="/">About</NavLink>
              </li>
              <li>
                <NavLink to="/">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/">Help</NavLink>
              </li>
              <li>
                <NavLink to="/">Phone</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-4 register">
            <h3>REGISTER</h3>
            <ul>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-author">
        <p>© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
        </p>
      </div>
    </div>
  )
}
