import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class BlockProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        id: "",
        Status: null
      }
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      project: {
        id: this.props.projectId,
        Status: this.props.data
      }
    });
  }
  componentDidMount() {
    console.log(this.state.project);
  }

  onSubmit(e) {
    if (this.props.data === 1) {
      this.props.onBlock(this.state.project, 0);
    } else {
      this.props.onBlock(this.state.project, 1);
    }
    ModalManager.close();
    e.preventDefault();
  }
  render() {
    const { style, data, onRequestClose } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}
        style={style}
      >
        <div
          className=""
          id="adminProjectModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="adminProjectModalLabel"
          aria-hidden="true"
          style={{
            height: "150px !important"
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-default">
                <h5
                  className="modal-title text-white"
                  id="adminProjectModalLabel"
                >
                  {data === 1 ? "Block" : "Unblock"} Project
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
                <div className="">
                  <form method="POST" onSubmit={this.onSubmit.bind(this)}>
                    <div className="md-form">
                      <div>
                        Are you sure you want to
                        <b>
                          {data === 1
                            ? " Block ".toUpperCase()
                            : " Unblock ".toUpperCase()}
                        </b>
                        the project?
                      </div>
                    </div>
                    <br />
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={ModalManager.close}
                      >
                        No
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default BlockProject;
