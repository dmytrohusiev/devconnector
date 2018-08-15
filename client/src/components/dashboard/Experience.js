import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment";
import * as profileActions from "../../store/actions/profileActions";

class Experience extends Component {
  handleOnDeleteClick = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD.MM.YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="DD.MM.YYYY">{exp.to}</Moment>
          )}
        </td>
        <td>
          <div
            className="btn btn-danger"
            onClick={() => this.handleOnDeleteClick(exp._id)}
          >
            Delete
          </div>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: propTypes.func.isRequired,
  experience: propTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteExperience: id => dispatch(profileActions.deleteExperience(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Experience);
