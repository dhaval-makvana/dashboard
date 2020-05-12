import { FETCH_DASHBOARD_DATA, FETCH_STUDENT_DETAILS, SORT_BY_MARKS, SORT_BY_NAME, SEARCH_STUDENTS_BY_NAME } from './types';
import { combineReducers } from 'redux';
import { sortAlphabetically, sortNumerically } from '../utils/index';

/**
 * Reducer is not modular.
 * A lot of code can be made into functions and put in a utils file.
 * Due to lack of time I am not doing that.
 * Apart from that I have tried my best to keep the code modular and use a folder structure that I'd usually use.
 */

const initialState = {
  dashboard: {
    loading: true,
    error: false,
    hasMore: false,
    students: [],
    filteredStudents: [],
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

        const newStudent = {
          ...student,
          marks: {
            ...student.marks
          }
        };

        let total = 0;
        for(let key in newStudent.marks) {
          newStudent.marks[key] = Math.round(newStudent.marks[key]); 
          total += newStudent.marks[key];
        }
        newStudent["totalMarks"] = total;

        studentsByIds[newStudent.student_id] = newStudent;
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
          for(let key in s.marks) {
            s.marks[key] = Math.round(s.marks[key]); 
            total += s.marks[key];
          }
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
          filteredStudents: modifiedStudents,
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
      let modifiedStudentData = { ...student };
      let total = 0;
      for(let key in student.marks) {
        student.marks[key] = Math.round(student.marks[key]);
        total += student.marks[key];
      }
      modifiedStudentData["totalMarks"] = total;

      return {
        ...state,
        studentDetails: {
          loading,
          error,
          studentsByIds: {
            ...state.studentDetails.studentsByIds,
            [student.student_id] : modifiedStudentData
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

    case SEARCH_STUDENTS_BY_NAME:
      const { payload } = action;
      const studentsArray = state.dashboard.students;
      const filteredResults = studentsArray.filter(item => item.name.toLowerCase().startsWith(payload.toLowerCase()));
      const filteredResultsName = [...filteredResults];
      const filteredResultsMarks = [...filteredResults];
      const fillingSortNames = sortAlphabetically(filteredResultsName, "name");
      const fillingSortMarks = sortNumerically(filteredResultsMarks, "totalMarks");
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          filteredStudents: filteredResults,
          sortedByNames: fillingSortNames,
          sortedByTotalMarks: fillingSortMarks
        }
      }
  
    default:
      return state;
  }
}

export default combineReducers({
  app: reducer
});