import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import { ModalManager } from "react-dynamic-modal/lib/Modal";
import BlockProject from "../components/AdminDashboard/BlockProject";
import Server from "../ServerIP";
import BlockUser from "../components/AdminDashboard/BlockUser";
import UploadProject from "../components/AdminDashboard/UploadProject";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      projects: [],
      archive: [],
      userId: "",
      allusers: []
    };
    this.quickadd = "Quick Add";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {
    this.getAllProjects();
  }

  // Get the id of the logged in user
  getUserid() {
    axios
      .request({
        method: "get",
        url: "/api/auth/show/current"
      })
      .then(response => {
        this.user = response.data;
        this.setState({
          userId: response.data
        });
      })
      .catch(error => {
        // User is not logged in
        window.location.href = Server + "/signin";
      });
  }
  // Logout and reset the cookie session
  onLogout() {
    axios
      .request({
        method: "get",
        url: "/api/auth/logout"
      })
      .then(response => {
        console.log(response.data);
        window.location = Server;
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Get all projects from the archive
  getAllArchiveProjects() {
    axios
      .request({
        method: "get",
        url: "/api/archive"
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          archive: response.data
        });
      })
      .catch(error => {
        window.location.href = Server + "/signin";
      });
  }
  // Get all incomplete projects
  getAllProjects() {
    axios
      .request({
        method: "get",
        url: "/api/projects"
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          projects: response.data
        });
        this.getAllUsers();
      })
      .catch(error => {
        window.location.href = Server + "/signin";
      });
  }
  // Get all user fromt the db
  getAllUsers = () => {
    axios
      .request({
        method: "get",
        url: "/api/users"
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          allusers: response.data
        });
        this.getAllArchiveProjects();
      })
      .catch(error => {
        window.location.href = Server + "/signin";
      });
  };
  // Block/Unblock a project
  blockProjectHandler(project, status) {
    axios
      .request({
        method: "put",
        url: "/api/projects/block/" + project.id,
        data: {
          Status: status
        }
      })
      .then(response => {
        console.log(response.data);
        this.getAllProjects();
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Block/Unblock a user by id
  blockUserHandler(user, status) {
    axios
      .request({
        method: "put",
        url: "/api/users/block/" + user.id,
        data: {
          Status: status
        }
      })
      .then(response => {
        console.log(response.data);
        this.getAllUsers();
      })
      .catch(error => {
        console.log(error);
      });
  }
  // Display a modal for block/unblock confirmation
  openModal = (e, projectStatus, projectId) => {
    let modalStyle = {
      content: {
        position: "relative",
        margin: "0% auto",
        width: "28.5%",
        background: "rgba(255, 255, 255, 0)",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px",
        overflow: "auto",
        borderRadius: "4px",
        outline: "none"
      }
    };
    ModalManager.open(
      <BlockProject
        style={modalStyle}
        data={projectStatus}
        projectId={projectId}
        onBlock={this.blockProjectHandler.bind(this)}
        onRequestClose={() => true}
      />
    );
    e.preventDefault();
  };
  // Block a user from the system
  openBlockUserModal = (e, userStatus, userId) => {
    let modalStyle = {
      content: {
        position: "relative",
        margin: "0% auto",
        width: "28.5%",
        background: "rgba(255, 255, 255, 0)",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px",
        overflow: "auto",
        borderRadius: "0px",
        outline: "none"
      }
    };
    ModalManager.open(
      <BlockUser
        style={modalStyle}
        data={userStatus}
        userId={userId}
        onBlock={this.blockUserHandler.bind(this)}
        onRequestClose={() => true}
      />
    );
    e.preventDefault();
  };
  // Open upload form
  openUploadModal = e => {
    let modalStyle = {
      content: {
        position: "relative",
        margin: "0% auto",
        width: "28.5%",
        background: "rgba(255, 255, 255, 0)",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px",
        overflow: "auto",
        borderRadius: "4px",
        outline: "none"
      }
    };
    ModalManager.open(
      <UploadProject
        style={modalStyle}
        data={this.state.projectId}
        onRequestClose={() => true}
        {...this.props}
      />
    );
    e.preventDefault();
  };

  render() {
    let allProjects, allusers, allArchiveProjects;
    if (this.state.projects.length > 0) {
      allProjects = this.state.projects.map((project, index) => (
        <tr key={index}>
          <th scope="row"> {index + 1}</th>
          <td>{project.ProjectTitle}</td>
          <td>{project.Member.length}</td>
          <td>{new Date(project.DeadLine).toString().substr(0, 15)}</td>
          <td>{Math.trunc(project.Progress) + "%"}</td>
          <td>
            <span>
              <a
                href="#!"
                type="button"
                id="editBtn"
                className="btn btn-md btn-outline-danger btn-rounded"
                title="Block Project"
                onClick={event =>
                  this.openModal(event, project.Status, project._id)
                }
              >
                <i className="fa fa-ban " aria-hidden="true" />
                <span className="px-1">
                  {project.Status === 1 ? "Block" : "Unblock"}
                </span>
              </a>
            </span>
          </td>
        </tr>
      ));
    }
    if (this.state.allusers.length > 0) {
      allusers = this.state.allusers.map((user, index) => {
        if (user.Type !== "1") {
          return (
            <tr key={index}>
              <th scope="row"> {index + 1}</th>
              <td>{user.Fname + " " + user.Lname}</td>
              <td>{user.Email}</td>
              <td>
                {new Date(user.DateOfRegistration).toString().substr(0, 15)}
              </td>
              <td>{user.Status === 1 ? "Active" : "Inactive"}</td>
              <td>
                <span>
                  <a
                    href="#!"
                    type="button"
                    id="editBtn"
                    className="btn btn-md btn-outline-danger btn-rounded"
                    title="Block Project"
                    onClick={event =>
                      this.openBlockUserModal(event, user.Status, user._id)
                    }
                  >
                    <i className="fa fa-ban " aria-hidden="true" />
                    <span className="px-1">
                      {user.Status === 1 ? "Block" : "Unblock"}
                    </span>
                  </a>
                </span>
              </td>
            </tr>
          );
        } else {
          return null;
        }
      });
    }
    if (this.state.archive.length > 0) {
      allArchiveProjects = this.state.archive.map((archive, index) => {
        return (
          <tr key={index}>
            <th scope="row"> {index + 1}</th>
            <td>{archive.Title}</td>
            <td>{new Date(archive.UploadDate).toString().substr(0, 15)}</td>
            <td>{archive.FileLocation.length}</td>
            <td>
              <span>
                <a
                  href="#!"
                  type="button"
                  id="editBtn"
                  className="btn btn-md btn-outline-danger btn-rounded"
                  title="Block Project"
                  onClick={event =>
                    this.openModal(event, archive.Status, archive._id)
                  }
                >
                  <i className="fa fa-ban " aria-hidden="true" />
                  <span className="px-1">Delete</span>
                </a>
              </span>
            </td>
          </tr>
        );
      });
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={false}
          details={false}
          projects={false}
          search={false}
          onLogout={this.onLogout.bind(this)}
          id={this.state.id}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Admin Dashboard" />
            <button
              className="btn btn-success btn-md pull-right"
              onClick={e => this.openUploadModal(e)}
            >
              <i className="fa fa-plus-circle fa-lg px-1" />Upload Project{" "}
            </button>
            <br />
            <div className="row justify-content-center ">
              <div className="row justify-content-center">
                <div className="col-lg-5" />
              </div>
              <div className="col-lg-8 m-auto">
                <div className="h5 text-primray">
                  <br />
                  <span className="text-primary h5">
                    Manage Active Projects
                  </span>
                  <br />
                  <br />
                </div>
                <div className="table-wrapper">
                  <table className="table table-hover">
                    <thead className="blue darken-3 text-white">
                      <tr>
                        <th scope="col"> #No </th>
                        <th scope="col">
                          <i className="fa fa-list pr-2" aria-hidden="true" />
                          Title
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-user-circle-o pr-2"
                            aria-hidden="true"
                          />
                          Members
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar pr-2"
                            aria-hidden="true"
                          />
                          Deadline
                        </th>
                        <th scope="col"> % Progress </th>
                        <th scope="col">
                          <i className="fa fa-edit pr-2" aria-hidden="true" />
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{allProjects}</tbody>
                  </table>
                </div>
                <hr />
              </div>
              <br />
              <br />
              <br />
              <div className="col-lg-8 m-auto ">
                <div>
                  <br />
                  <span className="text-success h5">Manage Users</span>
                  <br />
                  <br />
                </div>
                <div className="table-wrapper">
                  <table className="table table-hover">
                    <thead className="green darken-3 text-white">
                      <tr>
                        <th scope="col"> #No </th>
                        <th scope="col">
                          <i
                            className="fa fa-user-circle-o pr-2"
                            aria-hidden="true"
                          />
                          Full Name
                        </th>
                        <th scope="col">
                          <i className="fa fa-at pr-2" aria-hidden="true" />
                          Email
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar pr-2"
                            aria-hidden="true"
                          />
                          Date of Registration
                        </th>
                        <th scope="col">
                          <i className="fa fa-check pr-2" aria-hidden="true" />{" "}
                          Status{" "}
                        </th>
                        <th scope="col">
                          <i className="fa fa-edit pr-2" aria-hidden="true" />
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{allusers}</tbody>
                  </table>
                </div>
                <hr />
              </div>
              <div className="col-lg-8 m-auto ">
                <div>
                  <br />
                  <span className="text-success h5">Manage Users</span>
                  <br />
                  <br />
                </div>
                <div className="table-wrapper">
                  <table className="table table-hover">
                    <thead className="green darken-3 text-white">
                      <tr>
                        <th scope="col"> #No </th>
                        <th scope="col">
                          <i
                            className="fa fa-user-circle-o pr-2"
                            aria-hidden="true"
                          />
                          Project Title
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-calendar pr-2"
                            aria-hidden="true"
                          />
                          Date of Upload
                        </th>
                        <th scope="col">
                          <i
                            className="fa fa-paperclip pr-2"
                            aria-hidden="true"
                          />
                          Attached File
                        </th>
                        <th scope="col">
                          <i className="fa fa-edit pr-2" aria-hidden="true" />
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{allArchiveProjects}</tbody>
                  </table>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

export default AdminDashboard;
