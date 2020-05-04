import React, { Component, createRef } from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/navbar';
import StudentCard from '../../components/studentcard';
import ScrollToTopController from '../../components/ScrollToTop';
import PropTypes from 'prop-types';

class DashboardPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      pageNumber: 1
    };
    this.observer = createRef();
  }

  async componentDidMount() {
    const { query, pageNumber } = this.state;
    this.props.fetchDashboardData(query, pageNumber);
  }

  handleSearch = e => {
    this.props.fetchDashboardData(e.target.value, 1);
  };

  lastStudentElementRef = (node) => {
    const { loading, hasMore } = this.props;
    if (loading) return;
    if (this.observer.current) this.observer.current.disconnect();
    this.observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        let { pageNumber } = this.state;
        const { query } = this.props;
        this.props.fetchDashboardData(query, pageNumber + 1);
        this.setState((prevState) => {
          return {
            ...prevState,
            pageNumber: prevState.pageNumber + 1
          }
        });
      }
    });
    if (node) this.observer.current.observe(node);
    
  }

  render() {
    const {loading, hasMore, students, error, history, sortByName, sortByMarks } = this.props;

    return(
      <div className={styles.page}>
      <ScrollToTopController>
        <Navbar handleSearch={this.handleSearch} showSearchbar={true} showSort={true} sortByName={sortByName} sortByMarks={sortByMarks} />
        <div className={styles.grid}>
          {students.map((s, index) => {
            if (students.length === index + 1) {
              return <StudentCard {...s} key={s.id} history={history} ref={this.lastStudentElementRef} />;
            } else {
              return <StudentCard {...s} history={history} key={s.id} />;
            }
          })}
          {loading && <div>Loading ...</div>}
          {error && <div>Error</div>}
        </div>
      </ScrollToTopController>
    </div>
    )
  }
}

DashboardPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  students: PropTypes.array.isRequired,
  fetchDashboardData: PropTypes.func.isRequired,
  sortByName: PropTypes.func.isRequired,
  sortByMarks: PropTypes.func.isRequired
}

export default DashboardPage;