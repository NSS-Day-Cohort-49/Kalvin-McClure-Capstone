import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export const NavBar = (props) => {
  return (
    <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">

      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ghosts">Ghost Types</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/questions">I have A Q</Link>
        </li>
      </ul>
    </nav>
  )
}
