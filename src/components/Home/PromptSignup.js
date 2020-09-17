import React from "react";
import { NavLink } from "react-router-dom";

const PromptSignup = props => {
  return (
    <div className="jumbotron marginRow">
      <div className="container-fluid text-center">
        <br />
        <br />
        <br />
        <p>Manage your projects</p>
        <p>Assign and track each members's activity</p>
        <p>Get your project progress report</p>
        <p>View copmleted projects</p>
        <button className="btn btn-lg btn-dark-green">
          <NavLink to="/signup" className="text-white">
            <i className="fa fa-sign-in" aria-hidden="true" /> SignUp for Free
          </NavLink>
        </button>
        <br />
        <br />
        <p>Track and manager your projects Now !</p>
      </div>
    </div>
  );
};

export default PromptSignup;
