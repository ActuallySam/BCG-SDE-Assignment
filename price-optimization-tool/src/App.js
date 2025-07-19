import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDashboard from "./dashboard";
import PricingDashboard from "./pricing";
import Landing from "./landing";
import PrivateRoute from "./pages/PrivateRoute";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            {/* Public routes */}
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />

            {/* Protected routes */}
            <PrivateRoute path="/" exact component={Landing} allowedRoles={['admin', 'buyer', 'supplier']} />
            <PrivateRoute path="/dashboard" exact component={ProductDashboard} allowedRoles={['admin', 'supplier']} />
            <PrivateRoute path="/pricing-optimization" exact component={PricingDashboard} allowedRoles={['admin']} />

            {/* Catch-all route */}
            <Route path="/error/403" component={() => <h1>403 - User Not Allowed to access this page</h1>} />
            <Route path="/error/403" component={() => <h1>403 - Not Found</h1>} />
            <Route path="*" component={() => <h1>Something went wrong!</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;