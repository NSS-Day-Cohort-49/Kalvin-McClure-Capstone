import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./NavBar/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./HuntersHauntings.css"

export const HuntersHauntings = () => (
  <>
    <Route
      render={() => {
        if (sessionStorage.getItem("huntersHauntings_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)
