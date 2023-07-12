import React, { useCallback, useMemo, useState } from 'react';
import {
  CategoryListType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import Search from './Search';
import Category from './Category';
import { getDestinationListByTitleAndCategoryId } from '../../apis/destinationListAPI';
import {
  changeCategoryIdIntoName,
  extractCategoryIdFromCategoryList,
  isNullishSearchInput
} from './Utils/DestinationFiltersUtils';
import useCategoryListFetch from '../../hooks/DestinationListHooks/useCategoryListFetch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDestinations from '../../hooks/DestinationListHooks/useDestinations';

function DestinationFilters() {
  const [categoryList] = useCategoryListFetch();
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setDestinations, , setTotalDestinationsCount] = useDestinations();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const searchQueryParam = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const getfilteredResult = useCallback(
    async (searchQuery: string, selectedCategory: number[]) => {
      const res = await getDestinationListByTitleAndCategoryId(
        selectedCategory,
        searchQuery
      );
      const totalData = res?.data.total_count;
      const categorizedSearchingDestinationsList = res?.data.destinations;
      setTotalDestinationsCount(totalData);
      if (categoryList.length > 0) {
        const resultDestinations = changeCategoryIdIntoName(
          categoryList,
          categorizedSearchingDestinationsList
        );

        setDestinations(() => resultDestinations);
        return;
      }
    },
    [
      getDestinationListByTitleAndCategoryId,
      setTotalDestinationsCount,
      setDestinations,
      changeCategoryIdIntoName,
      categoryList
    ]
  );

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsUserSearched(() => true);
    const submittedQuery = e.target.searchQuery.value;
    if (isNullishSearchInput(submittedQuery)) {
      setIsShowAlert(true);
      navigate('/destination/list');
      return;
    }
    const searchQueryString = encodeURIComponent(submittedQuery);
    if (searchQueryString !== null) {
      setSearchParams(`?search=${searchQueryString}`);
      getfilteredResult(searchQueryParam, selectedCategory);
    }
    return;
  };

  const handleAllClick = () => {
    setIsLoading(true);
    setIsSelectedAll(true);
    const categoryIdList = extractCategoryIdFromCategoryList(categoryList);
    setSelectedCategory([...categoryIdList]);
    getfilteredResult(searchQueryParam, selectedCategory);
    return;
  };

  // 필터 해제
  const removeCategoryFromSelectedCategoryList = (targetCategoryId: number) => {
    const subSelectedCategory =
      selectedCategory?.filter(
        (categoryId) => categoryId !== targetCategoryId
      ) ?? [];
    setSelectedCategory([...subSelectedCategory]);
  };

  //필터 추가
  const addCategoryToSelectedCategoryList = (targetCategoryId: number) => {
    if (selectedCategory !== null) {
      return setSelectedCategory([...selectedCategory, targetCategoryId]);
    }
  };

  const handleCategoryClick = useCallback(
    (targetCategoryId: number) => {
      setIsLoading(true);

      if (isSelectedAll) {
        setIsSelectedAll(false);
        const newSelectedCategory = [targetCategoryId];
        setSelectedCategory(newSelectedCategory);
        getfilteredResult(searchQueryParam, selectedCategory);
        return;
      }

      selectedCategory.includes(targetCategoryId)
        ? removeCategoryFromSelectedCategoryList(targetCategoryId)
        : addCategoryToSelectedCategoryList(targetCategoryId);
      getfilteredResult(searchQueryParam, selectedCategory);
      return;
    },
    [
      setIsSelectedAll,
      setSelectedCategory,
      getfilteredResult,
      removeCategoryFromSelectedCategoryList,
      addCategoryToSelectedCategoryList
    ]
  );

  return (
    <>
      <Search
        selectedCategory={selectedCategory}
        getfilteredResult={getfilteredResult}
        isShowAlert={isShowAlert}
        setIsShowAlert={setIsShowAlert}
        handleSubmitQuery={handleSubmitQuery}
      />
      <Category
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isSelectedAll={isSelectedAll}
        setIsSelectedAll={setIsSelectedAll}
        handleAllClick={handleAllClick}
        handleCategoryClick={handleCategoryClick}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
}

export default DestinationFilters;
