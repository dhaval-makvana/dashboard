import React from 'react';
import styles from './style.module.scss';

export default props => {
  const { placeholder, onChange } = props;
  return (
    <div className={styles.searchbarContainer}>
      <input 
        className={styles.searchbar} 
        type='text' 
        placeholder={placeholder && placeholder} 
        onChange={onChange && onChange}
      />
    </div>
  );
};
