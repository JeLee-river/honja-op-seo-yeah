import React from 'react';
import styles from './LayoutPage.module.scss';

function LayoutPage(props: {
  children: React.ReactNode;
  mainTagRef: React.RefObject<HTMLElement>;
}) {
  return (
    <>
      <main className={styles.main} id='main' ref={props.mainTagRef}>
        {props.children}
      </main>
    </>
  );
}

export default LayoutPage;
