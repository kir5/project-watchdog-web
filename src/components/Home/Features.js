import React from "react";

const Features = () => {
  return (
    <div className="bg-indigo text-white">
      <br />
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-9">
            <div className="row justifiy-content-end">
              <div className="col-md-8">
                <span>
                  <img
                    style={{ width: "800px", height: "320px" }}
                    src="../img/landing_progress.bmp"
                    className="img-fluid ml-auto"
                    alt="Feature 1"
                  />
                </span>
              </div>
              <div className="col-md-4 my-auto text-left">
                <p>Manage your projects</p>
                <p>Assign and track each member's activity</p>
                <p>Get your project progress report</p>
                <p>View copmleted projects</p>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-4 my-auto text-right">
                <p>Assign tasks and milestones</p>
                <p>Attach files to your project </p>
                <p>Trace each activity of your projects.</p>
              </div>
              <div className="col-md-8">
                <span>
                  <img
                    src="../img/landing_tasks.png"
                    style={{ width: "800px", height: "320px" }}
                    className="img-fluid"
                    alt="Feature 2"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Features;
