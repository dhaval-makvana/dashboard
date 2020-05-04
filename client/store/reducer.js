import { FETCH_DASHBOARD_DATA, FETCH_STUDENT_DETAILS, SORT_BY_MARKS, SORT_BY_NAME } from './types';
import { combineReducers } from 'redux';
import { sortAlphabetically, sortNumerically } from '../utils/index';

const initialState = {
  dashboard: {
    loading: true,
    error: false,
    hasMore: false,
    students: [],
    query: '',
    sortedByTotalMarks: [],
    sortedByNames: [],
    sortType: ''
  },
  studentDetails: {
    loading: true,
    error: false,
    studentsByIds: {},
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA:
      const { students, query } = action.payload;
      const studentsByIds = {
        ...state.studentDetails.studentsByIds
      };
      students.map((student) => {
        studentsByIds[student.id] = student
      });
      let modifiedStudents = [];
      if (query === state.dashboard.query) {
        modifiedStudents = [...state.dashboard.students, ...students];
      } else {
        modifiedStudents = students;
      }

      modifiedStudents = modifiedStudents.map((s) => {
        if (!s["totalMarks"]) {
          let total = 0;
          s.subjects.map((subject) => {
            total += subject.marks
          });
          s["totalMarks"] = total;
        } 
        return s;
      });

      console.log("modifiedState", modifiedStudents);

      const sortName = sortAlphabetically(modifiedStudents, "name");
      const sortMarks = sortNumerically(modifiedStudents, "totalMarks");
      
      const hasMore = students.length > 0;

      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...action.payload,
          hasMore,
          students: modifiedStudents,
          sortedByNames: sortName,
          sortedByTotalMarks: sortMarks,
        },
        studentDetails: {
          ...state.studentDetails,
          studentsByIds
        }
      };
    
    case FETCH_STUDENT_DETAILS:
      const { student, loading, error } = action.payload;
      return {
        ...state,
        studentDetails: {
          loading,
          error,
          studentsByIds: {
            ...state.studentDetails.studentsByIds,
            [student.id] : student
          }
        }
      }
    
    case SORT_BY_MARKS:
      const { sortedByTotalMarks } = state.dashboard;
      if (state.dashboard.sortType === 'totalMarks') {
        sortedByTotalMarks.reverse();
      }
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          students: sortedByTotalMarks,
          sortType: 'totalMarks'
        }
      }
    
    case SORT_BY_NAME:
      const { sortedByNames } = state.dashboard;
      if (state.dashboard.sortType === 'name') {
        sortedByNames.reverse();
      }
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          students: sortedByNames,
          sortType: 'name'
        }
      }
  
    default:
      return state;
  }
}

export default combineReducers({
  app: reducer
});