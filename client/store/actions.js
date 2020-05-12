import { FETCH_DASHBOARD_DATA, FETCH_STUDENT_DETAILS, SORT_BY_NAME, SORT_BY_MARKS, SEARCH_STUDENTS_BY_NAME } from './types';
import axios from 'axios';

const fetchDashboardData = () => async dispatch => {
  let loading = true, students = [], studentsObject = {}, error = false;
  const res = await axios({
    method: 'GET',
    url: 'https://api.npoint.io/1953ab244d9a35de08a6',
  });

  try {
    studentsObject = res.data;
    loading = false;
  } catch (error) {
    if (axios.isCancel(error)) return;
    error = true;
  }

  for(let key in studentsObject) {
    students.push(studentsObject[key]);
  }

  const payload = { loading, students, error };
  return dispatch({ type: FETCH_DASHBOARD_DATA, payload });
};

const fetchStudentDetails = (id) => async dispatch => {
  let loading = true, student = {}, error = false;
  const res = await axios({
    method: 'GET',
    url: `https://api.npoint.io/1953ab244d9a35de08a6/${id}`,
    params: { id }
  })

  try {
    student = res.data;
    loading = false;
  } catch (error) {
    error = true;
  }

  const payload = { loading, student, error};
  return dispatch({ type: FETCH_STUDENT_DETAILS, payload });
};

const sortByName = () => dispatch => dispatch({ type: SORT_BY_NAME });

const sortByMarks = () => dispatch => dispatch({ type: SORT_BY_MARKS });

const searchStudentByName = (query) =>  dispatch => dispatch({ type: SEARCH_STUDENTS_BY_NAME, payload: query });

export default { fetchDashboardData, fetchStudentDetails, sortByName, sortByMarks, searchStudentByName };
