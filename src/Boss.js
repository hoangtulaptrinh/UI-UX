import React from 'react'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Login from './components/Login/Login'
import App from './App'

function Boss(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/App">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
export default Boss;