import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDestinationListByTitleAndCategoryId } from '../../apis/destinationListAPI';
import {
  CategoryListType,
  DestinationsType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import { changeCategoryIdIntoName } from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import { useSearchParams } from 'react-router-dom';

// import useDestinationsFetch from './useDestinationsFetch';

type useDestinationsReturnType = {
  // getfilteredResult: (
  //   searchQuery: string,
  //   selectedCategory: number[],
  //   categoryList: CategoryListType[]
  // ) => void;
  // destinations: specifiedCategoryDestinationsType[];
  destinations: DestinationsType[];
  totalDestinationsCount: number;
};

function useDestinations(
  selectedCategory: number[]
  // categoryList: CategoryListType[]
): useDestinationsReturnType {
  const [destinations, setDestinations] = useState<
    specifiedCategoryDestinationsType[]
  >([]);
  const [totalDestinationsCount, setTotalDestinationsCount] =
    useState<number>(0);
  const [searchParams] = useSearchParams();
  // const { categoryList } = useCategory();

  const searchQueryParams: string = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  // const totalCategoryList = useMemo(() => {
  //   return categoryList;
  // }, [categoryList]);

  const getfilteredResult = useCallback(async () => {
    const res = await getDestinationListByTitleAndCategoryId(
      searchQueryParams,
      selectedCategory
    );
    const totalCountData = res?.data.total_count;
    const categorizedSearchingDestinationsList = res?.data.destinations;
    // const destinationsData = changeCategoryIdIntoName(
    //   categoryList,
    //   categorizedSearchingDestinationsList
    // );
    setDestinations(categorizedSearchingDestinationsList);
    setTotalDestinationsCount(totalCountData);
  }, [
    searchQueryParams,
    selectedCategory,
    // categoryList,
    // changeCategoryIdIntoName,
    getDestinationListByTitleAndCategoryId,
    setDestinations,
    setTotalDestinationsCount
  ]);

  useEffect(() => {
    getfilteredResult();
  }, [getfilteredResult]);

  console.log(' destinations 커스텀 훅 실행');

  return { destinations, totalDestinationsCount };
}

export default useDestinations;
