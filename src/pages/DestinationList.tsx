import React, { useRef } from 'react';
import LayoutPage from '../components/DestinationList/LayoutPage';
import LayoutDestinationsContainer from '../components/DestinationList/LayoutDestinationsContainer';
import Search from '../components/DestinationList/Search';
import Category from '../components/DestinationList/Category';

function DestinationList() {
  const mainTagRef = useRef<HTMLElement>(null);

  return (
    <LayoutPage mainTagRef={mainTagRef}>
      <LayoutDestinationsContainer>
        <Search />
        <Category mainTagRef={mainTagRef} />
      </LayoutDestinationsContainer>
    </LayoutPage>
  );
}

export default DestinationList;
