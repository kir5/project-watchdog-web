import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import Server from "../ServerIP";
class AttachedFiles extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: ""
    };
    this.quickadd = "Quick Add";
  }

  unsafe_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {}

  unsafe_componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  unsafe_componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

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

  render() {
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={false}
          search={true}
          id={this.state.id}
          projects={true}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Project Files" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8 m-auto" />
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

AttachedFiles.propTypes = {};

export default AttachedFiles;
