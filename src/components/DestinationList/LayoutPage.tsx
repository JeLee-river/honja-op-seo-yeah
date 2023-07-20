import React from 'react';
import styles from './LayoutPage.module.scss';

function LayoutPage(props: { children: React.ReactNode }) {
  return (
    <>
      <main className={styles.main} id='main'>
        {props.children}
      </main>
    </>
  );
}

export default LayoutPage;
