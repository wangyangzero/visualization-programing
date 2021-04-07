import React, { useState, useEffect } from 'react';
import { getSetting } from 'src/store';
import { withComponent } from 'src/common/withComponent';
import { REVIEW } from 'src/constants';
import { IComponent } from 'src/type/setting';
import styles from './style.module.css';

export default function Review() {

  const [state, setState] = useState([]);

  useEffect(() => {
    getSetting('review')
      .then((res) => {
        if(!res?.length) return;
        setState(res as any);
      })
  },[]);

  return (
    <div className={styles.container}>
      { 
        state.map((item: IComponent, key) => 
          withComponent(REVIEW[item.componentKey], {}, JSON.stringify(item) + key))
      }
      <footer className={styles.footer}></footer>
    </div>
  );
}

