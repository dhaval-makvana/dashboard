import React from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
import Searchbar from "../searchbar";

export default (props) => {
	const {
		handleSearch,
		showSearchbar,
		showSort,
		sortByName,
    sortByMarks,
    showLogin
	} = props;
	const conditionalStyle = showSearchbar || showSort ? {} : styles.showExtras;
	return (
		<div className={`${styles.navbar} ${conditionalStyle}`}>
			<div className={styles.navitem}>
				<NavLink to="/">
					<img
						src="https://assets.embibe.com/production/Consumer/assets/images/common/embibefullLogo.svg"
						alt="logo"
					/>
				</NavLink>
			</div>
			{showSearchbar && (
				<Searchbar placeholder="search" onChange={handleSearch} />
			)}
			{showSort && (
				<>
					<div className={styles.navitem}>
						<button onClick={sortByName}>Sort By Name</button>
					</div>
					<div className={styles.navitem}>
						<button onClick={sortByMarks}>Sort By Marks</button>
					</div>
				</>
			)}
			{showLogin && (
				<>
					<div className={styles.navitem}>
						<NavLink to="/login">
              <button>Login</button>
						</NavLink>
					</div>
				</>
			)}
		</div>
	);
};
