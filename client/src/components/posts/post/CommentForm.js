import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import * as actions from "../../../store/actions/postActions";

class CommentForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postID } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postID, newComment);
    this.setState({
      text: ""
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  className="form-control form-control-lg"
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleOnChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  postID: propTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  addComment: (postID, newComment) =>
    dispatch(actions.addComment(postID, newComment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
