import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { ModalManager } from "react-dynamic-modal/lib/Modal";
import BlockedProject from "./BlockedProject";
class ProjectTemplate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      memberNames: []
    };
    this.members = [];
  }

  UNSAFE_componentWillMount(nextState) {
    // console.log(nextState);
    // this.props.members.map((member, index) => {
    //   return this.getUserName(member);
    // });
    // console.log("called compWillMount in project Template");
  }

  componentDidMount() {
    // console.log(this.state.memberNames);
    // console.log("called compDidMount in project Template");
  }

  getUserName(member) {
    // console.log("[ProjectTemplate.js] Inside getUserName");
    Axios.request({
      method: "get",
      url: "/api/users/name/" + member
    })
      .then(response => {
        // console.log(response.data.Fname);
        let currentMembers = [...this.state.memberNames];
        currentMembers.push(response.data.Fname);
        this.setState({
          memberNames: currentMembers
        });
        // this.members.push(response.data.Fname);
      })
      .catch(error => {
        console.log(error);
      });
  }

  openModal = (e, projectStatus, projectId) => {
    let modalStyle = {
      content: {
        // position: "relative",
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
      <BlockedProject style={modalStyle} onRequestClose={() => true} />
    );
    e.preventDefault();
  };
  render() {
    let openProject;
    if (this.props.status) {
      openProject = (
        <a href={"/dashboard?id=" + this.props.id} className="link-text">
          <h5 className="pull-right">
            Open Project <i className="fa fa-chevron-right" />
          </h5>
        </a>
      );
    } else {
      openProject = (
        <a href="#!" onClick={this.openModal} className="grey-text">
          <h5 className="pull-right">
            Open Project <i className="fa fa-chevron-right" />
          </h5>
        </a>
      );
    }
    return (
      <div className="col-md-4">
        <div className="card hoverable">
          <div className="view overlay" />
          <div className="card-body">
            {
              //<a href="" className="activator p-3 mr-2"><i className="fa fa-share-alt"></i></a>
            }
            <a href={"/dashboard?id=" + this.props.id} className="card-title">
              <h4>{this.props.title}</h4>
            </a>
            <hr />
            <p className="card-text d-block text-truncate">
              {this.props.description}
            </p>
            <span>
              <i className="fa fa-user-circle fa-lg" aria-hidden="true" />{" "}
              {this.props.members.length} member(s)
            </span>
            {openProject}
            <br />
            <div
              className="progress"
              style={{ height: "15px" }}
              title={"Progress : " + this.props.progress + "%"}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                style={{
                  width: Math.trunc(this.props.progress) + "%",
                  height: "15px"
                }}
                aria-valuenow={this.props.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {Math.trunc(this.props.progress)}%
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(ProjectTemplate);
