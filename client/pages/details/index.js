import React, { Component } from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/navbar';
import PropTypes from 'prop-types';

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.studentId = props.location.pathname.split('/')[2];
  }

  async componentDidMount() {
    const { studentsByIds } = this.props;
    const student = studentsByIds[this.studentId];
    if (!student) {
      this.props.fetchStudentDetails(this.studentId);
    }
  }

  render() {
    const { studentsByIds, loading, error } = this.props;
    const student = studentsByIds[this.studentId];
    const { name, id, totalMarks, subjects } = student;
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.details}>
            <div>{name}</div>
            <div>ID: {id}</div>
            <div>Total Marks: {totalMarks}/500</div>
          </div>
          <div className={styles.graph}>

          </div>
          {loading && <div>Loading ...</div>}
          {error && <div>Error</div>}
        </div>
      </div>
    );
  }
}

DetailsPage.propTypes = {
  studentsByIds: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchStudentDetails: PropTypes.func.isRequired
}

export default DetailsPage;
