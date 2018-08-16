import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import * as action from "../../store/actions/postActions";

class PostItem extends Component {
  handleOnDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    this.props.addLike(id);
  };

  onUnlikeClick = id => {
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={() => this.onLikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={
                      "fas fa-thumbs-up " +
                      (this.findUserLike(post.likes) ? "text-info" : "")
                    }
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={() => this.onUnlikeClick(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={() => this.handleOnDeleteClick(post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  auth: propTypes.object.isRequired,
  post: propTypes.object.isRequired,
  deletePost: propTypes.func.isRequired,
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(action.deletePost(id)),
  addLike: id => dispatch(action.addLike(id)),
  removeLike: id => dispatch(action.removeLike(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
