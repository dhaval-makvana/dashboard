import React, { forwardRef } from 'react';
import styles from './style.module.scss';
import { withRouter } from 'react-router-dom';

export default forwardRef((props, ref) => {
  // const { imageUrl, title, subTitle, id, history } = props;
  const { id, name, totalMarks, history } = props;
  return (
    <div className={styles.card} ref={ref} onClick={() => history.push(`/${id}`)}>
      <div className={styles.title}>{name}</div>
      <div className={styles.description}>ID : {id}</div>
      <div className={styles.description}>Total Marks: {totalMarks} / 500</div>
    </div>
  )
});