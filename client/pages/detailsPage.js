import actions from '../store/actions';
import DetailsPage from './details';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  console.log("state",state.app.studentDetails);
  return {
    ...state.app.studentDetails
  }
}

export default connect(mapStateToProps, {
  fetchStudentDetails :actions.fetchStudentDetails
})(DetailsPage);