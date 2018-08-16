import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import PostForm from "./PostForm";
import Spinner from "../common/spinner";
import * as actions from "../../store/actions/postActions";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: propTypes.func.isRequired,
  post: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(actions.getPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
