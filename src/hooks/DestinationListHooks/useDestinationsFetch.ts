import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAllCategoryList,
  getDestinationListByTitleAndCategoryId
} from '../../apis/destinationListAPI';
import { DestinationsType } from '../../types/DestinationListTypes';
import { extractCategoryIdFromCategoryList } from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import { useSearchParams } from 'react-router-dom';

type useDestinationsFetchReturnType = [
  getfilteredResult: (searchQuery: string, selectedCategory: number[]) => void,
  destinations: DestinationsType[],
  totalDestinationsCount: number
];

function useDestinationsFetch(): useDestinationsFetchReturnType {
  const [destinations, setDestinations] = useState<DestinationsType[]>([]);
  const [totalDestinationsCount, setTotalDestinationsCount] =
    useState<number>(0);
  const [searchParams] = useSearchParams();
  const [defaultCategoryIdList, setDefaultCategoryIdList] = useState<number[]>(
    []
  );

  const searchQueryParams: string = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const getCategoryIdList = useCallback(async () => {
    const res = await getAllCategoryList();
    setDefaultCategoryIdList(extractCategoryIdFromCategoryList([res?.data]));
    return;
  }, [
    getAllCategoryList,
    setDefaultCategoryIdList,
    extractCategoryIdFromCategoryList
  ]);

  const getfilteredResult = useCallback(
    async (searchQuery: string, selectedCategory: number[]) => {
      const res = await getDestinationListByTitleAndCategoryId(
        searchQuery,
        selectedCategory
      );
      const totalData = res?.data.total_count;
      const categorizedSearchingDestinationsList = res?.data.destinations;
      setTotalDestinationsCount(totalData);
      setDestinations(categorizedSearchingDestinationsList);
      return;
    },
    [
      getDestinationListByTitleAndCategoryId,
      setTotalDestinationsCount,
      setDestinations
    ]
  );

  useEffect(() => {
    getCategoryIdList();
    getfilteredResult(searchQueryParams, defaultCategoryIdList);
    console.log('debug useEffect');
  }, [
    getCategoryIdList,
    getfilteredResult,
    searchQueryParams,
    defaultCategoryIdList
  ]);

  console.log([
    getCategoryIdList,
    getfilteredResult,
    searchQueryParams,
    defaultCategoryIdList
  ]);

  return [getfilteredResult, destinations, totalDestinationsCount];
}

export default useDestinationsFetch;
