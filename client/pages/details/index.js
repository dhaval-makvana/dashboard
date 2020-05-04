import React, { Component } from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/navbar';
import PropTypes from 'prop-types';
import Chart from '../../components/charts';

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.studentId = props.location.pathname.split('/')[1];
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
    if (!student) {
      return null;
    }
    const { name, id, totalMarks, subjects } = student;


    /** Chart config starts */
    const BAR_CHART_CONFIG = {
      type: "bar",
      options: {
        maintainAspectRation: false,
        responsive: true,
        scales: {
          xAxes:[{
            scaleLabel: {
              display: true,
              fontSize: 14,
              labelString: 'Subject'
            }
          }],
          yAxes:[{
            scaleLabel: {
              display: true,
              fontSize: 14,
              labelString: 'Marks'
            },
            ticks: {
              beginAtZero:true
            }
          }]
        }
      },
      data: {
        labels: [],
        datasets: [{
          label: 'Marks Graph',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      }
    }

    /** Chart Config ends */


    subjects.map((subject) => {
      BAR_CHART_CONFIG.data.labels.push(subject.name);
      BAR_CHART_CONFIG.data.datasets[0].data.push(subject.marks);
    });
    return (
      <div className={styles.page}>
        <Navbar showLogin={true} />
        <div className={styles.container}>
          <div className={styles.details}>
            <div className={styles.name}>{name}</div>
            <div className={styles.id}>ID: {id}</div>
            <div className={styles.marks}>Total Marks: {totalMarks}/500</div>
          </div>
          <div className={styles.graph}>
            <Chart input={BAR_CHART_CONFIG} />
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
