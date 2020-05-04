import { FETCH_DASHBOARD_DATA, FETCH_STUDENT_DETAILS, SORT_BY_MARKS, SORT_BY_NAME } from './types';
import { combineReducers } from 'redux';
import { sortAlphabetically, sortNumerically } from '../utils/index';

/** reducer can be made much more better with smaller functions but due to lack of time couldn't make it. */

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

      const modifiedStudentsAlphabetically = [...modifiedStudents];
      const modifiedStudentsNumerically = [...modifiedStudents];

      const sortName = sortAlphabetically(modifiedStudentsAlphabetically, "name");
      const sortMarks = sortNumerically(modifiedStudentsNumerically, "totalMarks");
      
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
      let changedMarks = [...state.dashboard.sortedByTotalMarks];
      if (state.dashboard.sortType === 'totalMarks') {
        changedMarks = changedMarks.reverse();
      }
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          sortType: 'totalMarks',
          sortedByTotalMarks: changedMarks
        }
      }
    
    case SORT_BY_NAME:
      let changedNames = [...state.dashboard.sortedByNames];
      if (state.dashboard.sortType === 'name') {
        changedNames = changedNames.reverse();
      }
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          sortType: 'name',
          sortedByNames: changedNames
        }
      }
  
    default:
      return state;
  }
}

export default combineReducers({
  app: reducer
});