import React from 'react';
import styles from './LayoutDestinationsContainer.module.scss';

function LayoutDestinationsContainer(props: { children: React.ReactNode }) {
  return (
    <>
      <section className={styles.destinationsContainers}>
        {props.children}
      </section>
    </>
  );
}

export default LayoutDestinationsContainer;
