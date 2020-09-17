import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import Axios from "axios";
import Server from "../../ServerIP";

class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: ""
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      projectId: this.props.projectId
    });
  }
  componentDidMount() {}

  // Logout and reset the cookie session
  onLogout = () => {
    Axios.request({
      method: "get",
      url: "/api/auth/logout"
    })
      .then(response => {
        console.log(response.data);
        window.location.href = Server;
      })
      .catch(error => {
        console.log(error);
      });
  };
  onExit = e => {
    this.onLogout();
    ModalManager.close();
    e.preventDefault();
  };
  render() {
    const { style, onRequestClose } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}
      >
        <div
          className=""
          id="joinProjectModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="joinProjectModalLabel"
          aria-hidden="true"
          style={{
            height: "150px !important"
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-danger">
                <h5
                  className="modal-title text-white"
                  id="joinProjectModalLabel"
                >
                  Access Denied
                </h5>
              </div>
              <div className="modal-body">
                <div>
                  Your account has been
                  <span className="UPPER text-danger"> BLOCKED</span> by the
                  system administrator. If you want it to be open,please contact
                  the system administrator at &nbsp;
                  <a href="mailto:admin@projectwatchdog.com">
                    admin@projectwatchdog.com
                  </a>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-md btn-danger center"
                    onClick={event => {
                      this.onExit();
                    }}
                  >
                    <i className="fa fa-check-circle px-1" />
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default BlockedUser;
