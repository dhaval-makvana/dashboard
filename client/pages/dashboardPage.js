import actions from '../store/actions';
import DashboardPage from './dashboard';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  console.log("state component", state.app.dashboard);
  return {
    ...state.app.dashboard
  }
}

export default connect(mapStateToProps, {
  fetchDashboardData :actions.fetchDashboardData,
  sortByName: actions.sortByName,
  sortByMarks: actions.sortByMarks
})(DashboardPage);