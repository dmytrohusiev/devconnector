import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import * as profileActions from "../../store/actions/profileActions";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleOnDeleteAccountClick = event => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {/* TODO: exp and edu*/}
            <div style={{ margin: "60px auto" }}>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleOnDeleteAccountClick}
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  deleteAccount: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(profileActions.getCurrentProfile()),
  deleteAccount: () => dispatch(profileActions.deleteAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);