import React, { Component, createRef } from "react";
import styles from "./index.module.scss";
import Navbar from "../../components/navbar";
import StudentCard from "../../components/studentcard";
import ScrollToTopController from "../../components/ScrollToTop";
import PropTypes from "prop-types";

class DashboardPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			pageNumber: 1,
		};
		this.observer = createRef();
	}

	async componentDidMount() {
		const { query, pageNumber } = this.state;
		this.props.fetchDashboardData();
	}

	handleSearch = (e) => {
		this.props.searchStudentByName(e.target.value);
	};


	render() {
		const {
			loading,
			filteredStudents,
			error,
			history,
			sortByName,
			sortByMarks,
			sortType,
			sortedByTotalMarks,
			sortedByNames,
		} = this.props;

		console.log("props", this.props);

		let studentsMap;
		if (sortType === "name") {
			studentsMap = sortedByNames;
		} else if (sortType === "totalMarks") {
			studentsMap = sortedByTotalMarks;
		} else {
			studentsMap = filteredStudents;
		}

		return (
			<div className={styles.page}>
				<ScrollToTopController>
					<Navbar
						handleSearch={this.handleSearch}
						showSearchbar={true}
						showSort={true}
						sortByName={sortByName}
						sortByMarks={sortByMarks}
					/>
					<div className={styles.grid}>
						{studentsMap.map((s, index) => {
							return <StudentCard {...s} history={history} key={s.student_id} />;
						})}
						{studentsMap.length === 0 ? (
							<div>No students found!</div>
						): null}
						{loading && <div>Loading ...</div>}
						{error && <div>Error</div>}
					</div>
				</ScrollToTopController>
			</div>
		);
	}
}

DashboardPage.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	filteredStudents: PropTypes.array.isRequired,
	fetchDashboardData: PropTypes.func.isRequired,
	sortByName: PropTypes.func.isRequired,
	sortByMarks: PropTypes.func.isRequired,
	searchStudentByName: PropTypes.func.isRequired
};

export default DashboardPage;
