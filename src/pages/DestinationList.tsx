import React from 'react';
import LayoutPage from '../components/DestinationList/LayoutPage';
import LayoutDestinationsContainer from '../components/DestinationList/LayoutDestinationsContainer';
import Search from '../components/DestinationList/Search';
import Destinations from '../components/DestinationList/Destinations';
import Category from '../components/DestinationList/Category';

function DestinationList() {
  return (
    <LayoutPage>
      <LayoutDestinationsContainer>
        <Search />
        <Category />
        <Destinations />
      </LayoutDestinationsContainer>
    </LayoutPage>
  );
}

export default DestinationList;
