import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAllCategoryList,
  getDestinationListByTitleAndCategoryId
} from '../../apis/destinationListAPI';
import {
  DestinationsType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import {
  changeCategoryIdIntoName,
  extractCategoryIdFromCategoryList
} from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import { useSearchParams } from 'react-router-dom';
import useCategory from './useCategory';
// import useDestinationsFetch from './useDestinationsFetch';

type useDestinationsReturnType = {
  getfilteredResult: (searchQuery: string, selectedCategory: number[]) => void;
  destinations: specifiedCategoryDestinationsType[];
  totalDestinationsCount: number;
};

function useDestinations(): useDestinationsReturnType {
  // const [getfilteredResult] = useDestinationsFetch();
  const [destinations, setDestinations] = useState<
    specifiedCategoryDestinationsType[]
  >([]);
  const [totalDestinationsCount, setTotalDestinationsCount] =
    useState<number>(0);
  const [searchParams] = useSearchParams();
  const [defaultCategoryIdList, setDefaultCategoryIdList] = useState<number[]>(
    []
  );
  const { categoryList, categoryIdList, selectedCategory } = useCategory();

  const searchQueryParams: string = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const totalCategoryList = useMemo(() => {
    return categoryList;
  }, [categoryList]);

  const getfilteredResult = useCallback(
    async (searchQuery: string, selectedCategory: number[]) => {
      const res = await getDestinationListByTitleAndCategoryId(
        searchQuery,
        selectedCategory
      );
      const totalData = res?.data.total_count;
      const categorizedSearchingDestinationsList = res?.data.destinations;
      setDestinations(() => {
        return changeCategoryIdIntoName(
          categoryList,
          categorizedSearchingDestinationsList
        );
      });
      setTotalDestinationsCount(totalData);
    },
    [
      changeCategoryIdIntoName,
      getDestinationListByTitleAndCategoryId,
      setDestinations,
      setTotalDestinationsCount
    ]
  );

  useEffect(() => {
    getfilteredResult(searchQueryParams, selectedCategory);
  }, [getfilteredResult, searchQueryParams, selectedCategory]);

  return { getfilteredResult, destinations, totalDestinationsCount };
}

export default useDestinations;
