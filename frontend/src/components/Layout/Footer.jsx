import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-muted">© 2023 Amazon Company, Inc</p>

          <NavLink to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
             <svg className="bi me-2" width="40" height="32"></svg>
          </NavLink>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><NavLink to="/" class="nav-link px-2 text-muted">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/" class="nav-link px-2 text-muted">Contact</NavLink></li>
            <li className="nav-item"><NavLink to="/" class="nav-link px-2 text-muted">About</NavLink></li>
          </ul>
        </footer>
      </div>
    </div>
  )
}

export default Footer;