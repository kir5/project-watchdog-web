import axios from "axios";
import React, { Component } from "react";
import ProjectNav from "../components/Common/ProjectNav";
import PageHeader from "../components/Common/PageHeader";
import MainFooter from "../components/Common/MainFooter";
import Server from "../ServerIP";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: {},
      chattext: []
    };
    this.quickadd = "Quick Add";
  }

  UNSAFE_componentWillMount() {
    this.getUserid();
  }

  componentDidMount() {}

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

  posChat(e) {
    let all = [...this.state.chattext];
    let text = e.target.value;
    all.push(text);
    this.setState({
      chattext: all
    });
  }

  render() {
    let allChats;
    if (this.state.chattext.length > 0) {
      allChats = this.state.chattext.map((chat, index) => {
        return (
          <div className="row">
            <div className="col-md-11">
              <div className="card mt-4">
                <div className="card-body">chat[index]</div>
              </div>
            </div>
            <div className="col-md-1 pull-right mt-5">
              <div className="">
                <i
                  className="fa fa-user-circle fa-lg mr-4 ml-3 mt-3"
                  aria-hidden="true"
                />
                <p>You</p>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <ProjectNav
          quickadd=""
          sidebar={true}
          details={false}
          search={true}
          projects={true}
          id={this.state.id}
          onLogout={this.onLogout.bind(this)}
          projectid={new URLSearchParams(this.props.location.search).get("id")}
          {...this.props}
        />
        <main className="no-pt minheight">
          <div className="container-fluid">
            <PageHeader title="Chat" />
            <br />
            <div className="row justify-content-center ">
              <div className="col-md-8 m-auto">
                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="h4">Members</div>
                        <hr className="divider" />
                        <ul className="nav flex-column">
                          <li className="nav-item waves-effect waves-dark">
                            <a className="nav-link no-pl  text-black">
                              <i
                                className="fa fa-user-circle fa-lg mr-4 ml-3"
                                aria-hidden="true"
                              />
                              Abebe
                            </a>
                          </li>
                          <li className="nav-item waves-effect waves-light">
                            <a className="nav-link no-pl text-black">
                              <i
                                className="fa fa-user-circle fa-lg mr-4 ml-3"
                                aria-hidden="true"
                              />
                              Bereket
                            </a>
                          </li>
                          <li className="nav-item waves-effect waves-light">
                            <a className="nav-link no-pl text-black">
                              <i
                                className="fa fa-user-circle fa-lg mr-4 ml-3"
                                aria-hidden="true"
                              />
                              Chala
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-9 mt-4">
                        <div className="mb-5">
                          <form className="fomr-inline">
                            <input
                              type="text"
                              placeholder="Write something ..."
                            />
                            <button
                              className="btn btn-md btn-default pull-right"
                              onClick={e => {
                                this.posChat(e);
                              }}
                            >
                              Send
                            </button>
                          </form>
                        </div>
                        <br />
                        {allChats}
                        <div className="row">
                          <div className="col-md-1">
                            <div className="">
                              <i
                                className="fa fa-user-circle fa-lg mr-4 ml-3 mt-3"
                                aria-hidden="true"
                              />
                              <p>Abebe</p>
                            </div>
                          </div>
                          <div className="col-md-11">
                            <div className="card">
                              <div className="card-body">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Amet libero assumenda
                                veritatis earum iciis
                              </div>
                            </div>
                          </div>
                          <div className="col-md-11">
                            <div className="card mt-4">
                              <div className="card-body">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Amet libero assumenda
                                veritatis earum
                                <p>Abebe</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-1 pull-right mt-5">
                            <div className="">
                              <i
                                className="fa fa-user-circle fa-lg mr-4 ml-3 mt-3"
                                aria-hidden="true"
                              />
                              <p>Berket</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }
}

Chat.propTypes = {};

export default Chat;
