import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDestinationListByTitleAndCategoryId } from '../../apis/destinationListAPI';
import {
  DestinationsType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import { useSearchParams } from 'react-router-dom';

type useDestinationsReturnType = {
  destinations: DestinationsType[];
  totalDestinationsCount: number;
};

function useDestinations(
  selectedCategory: number[]
): useDestinationsReturnType {
  const [destinations, setDestinations] = useState<
    specifiedCategoryDestinationsType[]
  >([]);
  const [totalDestinationsCount, setTotalDestinationsCount] =
    useState<number>(0);
  const [searchParams] = useSearchParams();

  const searchQueryParams: string = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const getfilteredResult = useCallback(async () => {
    const res = await getDestinationListByTitleAndCategoryId(
      searchQueryParams,
      selectedCategory
    );
    const totalCountData = res?.data.total_count;
    const categorizedSearchingDestinationsList = res?.data.destinations;
    setDestinations(categorizedSearchingDestinationsList);
    setTotalDestinationsCount(totalCountData);
  }, [
    searchQueryParams,
    selectedCategory,
    getDestinationListByTitleAndCategoryId,
    setDestinations,
    setTotalDestinationsCount
  ]);

  useEffect(() => {
    getfilteredResult();
  }, [getfilteredResult]);

  return { destinations, totalDestinationsCount };
}

export default useDestinations;
