import React, { forwardRef } from 'react';
import styles from './style.module.scss';

export default forwardRef((props, ref) => {
  const { student_id, name, totalMarks, history } = props;
  return (
    <div className={styles.card} ref={ref} onClick={() => history.push(`/${student_id}`)}>
      <div className={styles.title}>{name}</div>
      <div className={styles.description}>ID : {student_id}</div>
      <div className={styles.description}>Total Marks: {totalMarks} / 150</div>
    </div>
  )
});