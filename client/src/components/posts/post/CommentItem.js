import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import * as actions from "../../../store/actions/postActions";

class CommentItem extends Component {
  handleOnDeleteClick = (postID, commentID) => {
    this.props.deleteComment(postID, commentID);
  };

  render() {
    const { comment, postID, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                onClick={() => this.handleOnDeleteClick(postID, comment._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: propTypes.object.isRequired,
  comment: propTypes.object.isRequired,
  postID: propTypes.string.isRequired,
  deleteComment: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  deleteComment: (postID, commentID) =>
    dispatch(actions.deleteComment(postID, commentID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
