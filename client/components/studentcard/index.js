import React, { forwardRef } from 'react';
import styles from './style.module.scss';

export default forwardRef((props, ref) => {
  const { id, name, totalMarks, history } = props;
  return (
    <div className={styles.card} ref={ref} onClick={() => history.push(`/${id}`)}>
      <div className={styles.title}>{name}</div>
      <div className={styles.description}>ID : {id}</div>
      <div className={styles.description}>Total Marks: {totalMarks} / 500</div>
    </div>
  )
});