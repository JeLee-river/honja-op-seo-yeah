import { useState } from 'react';
import { specifiedCategoryDestinationsType } from '../../types/DestinationListTypes';

function useDestinations(): [
  specifiedCategoryDestinationsType[],
  React.Dispatch<React.SetStateAction<specifiedCategoryDestinationsType[]>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
] {
  const [destinations, setDestinations] = useState<
    specifiedCategoryDestinationsType[]
  >([]);
  const [totalDestinationsCount, setTotalDestinationsCount] =
    useState<number>(0);

  return [
    destinations,
    setDestinations,
    totalDestinationsCount,
    setTotalDestinationsCount
  ];
}

export default useDestinations;
