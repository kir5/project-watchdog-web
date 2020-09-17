import React, { Component } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  UNSAFE_componentWillMount() {}
  componentDidMount() {
    this.setState({
      id: this.props.userId
    });
  }

  onSubmit(e) {
    this.props.onDelete(this.state.id);
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
              <div className="modal-header bg-danger">
                <h5
                  className="modal-title text-white"
                  id="adminProjectModalLabel"
                >
                  Delete User
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
                        <b className="text-danger">&nbsp;DELETE&nbsp;</b>
                        this user?
                      </div>
                    </div>
                    <br />
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                      >
                        <i className="fa fa-trash-o px-1" aria-hidden="true" />
                        Yes
                      </button>
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={ModalManager.close}
                      >
                        <i
                          className="fa fa-times-circle px-1"
                          aria-hidden="true"
                        />
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

export default DeleteUser;
