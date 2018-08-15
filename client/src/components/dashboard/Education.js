import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment";
import * as profileActions from "../../store/actions/profileActions";

class Education extends Component {
  handleOnDeleteClick = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD.MM.YYYY">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="DD.MM.YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <div
            className="btn btn-danger"
            onClick={() => this.handleOnDeleteClick(edu._id)}
          >
            Delete
          </div>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: propTypes.func.isRequired,
  education: propTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteEducation: id => dispatch(profileActions.deleteEducation(id))
});

export default connect(
  null,
  mapDispatchToProps
)(Education);
