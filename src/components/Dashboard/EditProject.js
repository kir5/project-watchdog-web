import React, { PureComponent } from "react";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import DeleteUser from "./DeleteUser";

class EditProject extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      memberNames: [],
      leader: false
    };
    this.memberNames = [];
    this.nextState = {};
    this.oldState = {};
  }

  UNSAFE_componentWillMount() {
    this.setState({
      project: this.props.project
    });
    this.oldState = this.state.project;
  }
  componentDidMount() {}

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    this.nextState = nextState;
  }

  onTitleChange(e) {
    this.setState({
      project: {
        title: e.target.value,
        desc: this.state.project.ProjectDescription,
        deadline: this.state.project.DeadLine
      }
    });
  }

  onDesChange(e) {
    this.setState({
      project: {
        title: this.state.project.ProjectTitle,
        desc: e.target.value,
        deadline: this.state.project.DeadLine
      },
      deadlineError: true
    });
  }

  onDeadlineChange(e) {
    if (new Date(e.target.value).getTime() >= new Date().getTime()) {
      let deadline = new Date(e.target.value).toISOString();
      console.log(deadline);
      this.setState({
        project: {
          title: this.state.project.ProjectTitle,
          desc: this.state.project.ProjectDescription,
          deadline: deadline
        },
        deadlineError: false
      });
    } else if (e.target.value === "" || e.target.value) {
      this.setState({
        deadlineError: true
      });
    }
  }

  onSubmit(e) {
    if (!this.state.deadlineError) {
      e.preventDefault();
    } else {
      this.setState({
        deadlineError: true
      });
      e.preventDefault();
    }
  }
  openDeleteModal = (e, userId) => {
    console.log(userId);
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
      <DeleteUser
        style={modalStyle}
        data={userId}
        userId={userId}
        onDelete={this.props.onDeleteMember}
        onRequestClose={() => true}
        {...this.props}
      />
    );
    e.preventDefault();
  };
  render() {
    const { style, onRequestClose } = this.props;
    let deadlineError;
    if (this.state.deadlineError) {
      deadlineError = (
        <div className="text-danger"> Proper deadline date is required</div>
      );
    }

    let memeberNames = this.props.allMemberNames.map((memberName, index) => {
      if (this.props.leader !== memberName.fullName) {
        return (
          <li key={memberName.id} className="list-group-item">
            {memberName.fullName}
            <a onClick={e => this.openDeleteModal(e, memberName.id)}>
              <span className="pull-right btn btn-sm btn-danger">
                <i className="fa fa-trash-o px-1" aria-hidden="true" />Delete
              </span>
            </a>
          </li>
        );
      } else {
        return null;
      }
    });

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
            height: "250px !important"
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header unique-color">
                <h5
                  className="modal-title text-white"
                  id="joinProjectModalLabel"
                >
                  Edit Project
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
                      <label htmlFor="projectTitle">Project Title</label>
                      <input
                        type="text"
                        id="#projectTitle"
                        className="form-control"
                        required
                        onChange={this.onTitleChange.bind(this)}
                        defaultValue={this.state.project.ProjectTitle}
                      />
                    </div>
                    <div className="md-form">
                      <label htmlFor="descrpiton">Description</label>
                      <textarea
                        type="text"
                        id="#descrpiton"
                        className="form-control md-textarea"
                        rows="5"
                        required
                        onChange={this.onDesChange.bind(this)}
                        defaultValue={this.state.project.ProjectDescription}
                      />
                    </div>
                    <label htmlFor="date-picker">Deadline</label>
                    <div className="md-form">
                      <input
                        type="date"
                        id="date-picker"
                        className="form-control datepicker"
                        date-date-format="DD MM YYYY"
                        onChange={this.onDeadlineChange.bind(this)}
                        defaultValue={new Date(this.props.project.DeadLine)
                          .toISOString()
                          .substring(0, 10)}
                        required
                      />
                      {deadlineError}
                    </div>
                    <div>
                      <hr />
                      <div className="h6">Member List</div>
                      <ul className="list-group">{memeberNames}</ul>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onSubmit={this.onSubmit.bind(this)}
                      >
                        <i className="fa fa-check px-1" />
                        Save Project
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

export default EditProject;
