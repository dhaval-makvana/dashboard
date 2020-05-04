import { FETCH_DASHBOARD_DATA, FETCH_STUDENT_DETAILS, SORT_BY_NAME, SORT_BY_MARKS } from './types';
import axios from 'axios';

const fetchDashboardData = (query, pageNumber) => async dispatch => {
  let cancel, loading = true, hasMore = false, students = [], error = false;
  const res = await axios({
    method: 'GET',
    url: 'http://localhost:3000/api/students/dashboard',
    params: { query, pageNumber },
    cancelToken: new axios.CancelToken(c => (cancel = c))
  })

  try {
    students = res.data.data;
    hasMore = res.data.data.length > 0;
    loading = false;
  } catch (error) {
    if (axios.isCancel(error)) return;
    error = true;
  }

  const payload = { loading, students, error, hasMore, query };
  return dispatch({ type: FETCH_DASHBOARD_DATA, payload });
};

const fetchStudentDetails = (id) => async dispatch => {
  let loading = true, student = {}, error = false;
  const res = await axios({
    method: 'GET',
    url: 'http://localhost:3000/api/students/',
    params: { id }
  })

  try {
    student = res.data.data;
    loading = false;
  } catch (error) {
    error = true;
  }

  const payload = { loading, student, error};
  return dispatch({ type: FETCH_STUDENT_DETAILS, payload });
};

const sortByName = () => dispatch => dispatch({ type: SORT_BY_NAME });

const sortByMarks = () => dispatch => dispatch({ type: SORT_BY_MARKS });

export default { fetchDashboardData, fetchStudentDetails, sortByName, sortByMarks };
