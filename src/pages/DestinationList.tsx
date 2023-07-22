import React, { useRef } from 'react';
import LayoutPage from '../components/DestinationList/LayoutPage';
import LayoutDestinationsContainer from '../components/DestinationList/LayoutDestinationsContainer';
import Search from '../components/DestinationList/Search';
import Destinations from '../components/DestinationList/Destinations';
import Category from '../components/DestinationList/Category';

function DestinationList() {
  const detailPageRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutPage detailPageRef={detailPageRef}>
      <LayoutDestinationsContainer>
        <Search />
        <Category />
        <Destinations detailPageRef={detailPageRef} />
      </LayoutDestinationsContainer>
    </LayoutPage>
  );
}

export default DestinationList;
