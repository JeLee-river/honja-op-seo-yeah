import React, { useRef } from 'react';
import LayoutPage from '../components/DestinationList/LayoutPage';
import LayoutDestinationsContainer from '../components/DestinationList/LayoutDestinationsContainer';
import Search from '../components/DestinationList/Search';
import Destinations from '../components/DestinationList/Destinations';
import Category from '../components/DestinationList/Category';

function DestinationList() {
  const mainTagRef = useRef<HTMLElement>(null);

  return (
    <LayoutPage mainTagRef={mainTagRef}>
      <LayoutDestinationsContainer>
        <Search />
        <Category />
        <Destinations mainTagRef={mainTagRef} />
      </LayoutDestinationsContainer>
    </LayoutPage>
  );
}

export default DestinationList;
