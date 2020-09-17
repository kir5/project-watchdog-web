import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class BlockedProject extends Component {
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

  onSubmit(e) {
    this.setState({
      projectId: this.props.projectId
    });
    console.log(this.state.projectId);
    this.props.sendRequest(this.state.projectId);
    ModalManager.close();
    e.preventDefault();
  }
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
                  Project Blocked
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={ModalManager.close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  Your project has been
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
                    onClick={ModalManager.close}
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

export default BlockedProject;
