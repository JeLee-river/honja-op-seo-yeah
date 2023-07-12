import React from 'react';
import Layout from '../components/DestinationList/Layout';
import Search from '../components/DestinationList/Search';
import DestinationFilters from '../components/DestinationList/DestinationFilters';
import Destinations from '../components/DestinationList/Destinations';

function DestinationList() {
  return (
    <Layout>
      {/*<div> 레이아웃 컴포넌트 만들기*/}
      <DestinationFilters />
      <Destinations />
      {/*</div>*/}
    </Layout>
  );
}

export default DestinationList;
