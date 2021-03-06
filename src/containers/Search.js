import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import SearchTemplate from "../components/Search/SearchTemplate";
import Server from "../ServerIP";
class Search extends Component {
  constructor(props) {
    super(props);
    this.keyword = "";
    this.state = {
      userId: "",
      results: []
    };
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
    this.keyword = new URLSearchParams(this.props.history.location).get(
      "keyword"
    );
  }

  componentDidMount() {
    this.getSerchResults();
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

  getSerchResults() {
    axios
      .get(
        "/api/projects/search/" +
          new URLSearchParams(this.props.location.search).get("keyword")
      )
      .then(response => {
        this.setState({
          results: response.data
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendRequest(projectID) {
    console.log(projectID);
    axios
      .request({
        method: "put",
        url: "/api/requests/" + projectID,
        data: {
          UserID: this.state.userId._id,
          Date: Date.now()
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    this.getSerchResults();
  }

  render() {
    let searchResults;
    if (this.state.results.length > 0) {
      searchResults = this.state.results.map(project => {
        return (
          <SearchTemplate
            key={project._id}
            id={project._id}
            title={project.ProjectTitle}
            description={project.ProjectDescription}
            startDate={project.StartDate}
            deadline={project.DeadLine}
            progress={project.Progress}
            members={project.Member}
            request={project.Request}
            userid={this.state.userId._id}
            sendRequest={this.sendRequest.bind(this)}
          />
        );
      });
    } else {
      searchResults = (
        <div>
          <h5>No results found!</h5>
        </div>
      );
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={false}
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
            <PageHeader
              title={
                "Search results for " +
                new URLSearchParams(this.props.location.search).get("keyword")
              }
            />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-10 m-auto">
                <div className="row">{searchResults}</div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

export default Search;
