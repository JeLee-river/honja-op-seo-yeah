import React from 'react';
import styles from './LayoutPage.module.scss';

function LayoutPage(props: {
  children: React.ReactNode;
  detailPageRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <main className={styles.main} id='main' ref={props.detailPageRef}>
        {props.children}
      </main>
    </>
  );
}

export default LayoutPage;
