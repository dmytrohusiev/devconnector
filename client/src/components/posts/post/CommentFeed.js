import React, { Component } from "react";
import propTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postID } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postID={postID} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: propTypes.array.isRequired,
  postID: propTypes.string.isRequired
};

export default CommentFeed;
