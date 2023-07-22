import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryListType } from '../../types/DestinationListTypes';
import { useSearchParams } from 'react-router-dom';
import { extractCategoryIdFromCategoryList } from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import useDestinationsFetch from './useDestinationsFetch';
import { getAllCategoryList } from '../../apis/destinationListAPI';

type useCategoryReturnType = [
  categoryList: CategoryListType[],
  categoryIdList: number[],
  handleAllClick: () => void,
  handleCategoryClick: (categoryId: number) => void,
  isSelectedAll: boolean,
  selectedCategory: number[],
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
];

function useCategory(): useCategoryReturnType {
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([]);
  const [categoryIdList, setCategoryIdList] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getfilteredResult] = useDestinationsFetch();

  const [searchParams] = useSearchParams();

  const searchQueryParams = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const getCategoryAndIdList = useCallback(async () => {
    const res = await getAllCategoryList();
    setCategoryList(res?.data);
    setCategoryIdList(extractCategoryIdFromCategoryList([...categoryList]));
  }, [
    getAllCategoryList,
    setCategoryList,
    setCategoryIdList,
    extractCategoryIdFromCategoryList
  ]);

  useEffect(() => {
    getCategoryAndIdList();
  }, [getCategoryAndIdList]);

  const handleAllClick = useCallback(() => {
    setIsLoading(true);
    setIsSelectedAll(true);
    setSelectedCategory([...categoryIdList]);
    getfilteredResult(searchQueryParams, [...selectedCategory]);
    return;
  }, [
    setIsLoading,
    setIsSelectedAll,
    setSelectedCategory,
    getfilteredResult,
    searchQueryParams,
    selectedCategory
  ]);

  // 필터 해제
  const removeCategoryFromSelectedCategoryList = useCallback(
    (targetCategoryId: number) => {
      return setSelectedCategory((prevSelectedCategory) => {
        return (
          prevSelectedCategory.filter(
            (categoryId) => categoryId !== targetCategoryId
          ) ?? []
        );
      });
    },
    [setSelectedCategory]
  );

  //필터 추가
  const addCategoryToSelectedCategoryList = useCallback(
    (targetCategoryId: number) => {
      return setSelectedCategory((prevSelectedCategory) => {
        return [...prevSelectedCategory, targetCategoryId];
      });
    },
    [setSelectedCategory]
  );
  //계산 대신 토글로 활성화된 카테고리 구분
  const handleCategoryClick = useCallback(
    (targetCategoryId: number) => {
      setIsLoading(true);

      if (isSelectedAll) {
        setIsSelectedAll(false);
        const newSelectedCategory = [targetCategoryId];
        setSelectedCategory(newSelectedCategory);
        getfilteredResult(searchQueryParams, [...selectedCategory]);
        return;
      }

      selectedCategory.includes(targetCategoryId)
        ? removeCategoryFromSelectedCategoryList(targetCategoryId)
        : addCategoryToSelectedCategoryList(targetCategoryId);
      getfilteredResult(searchQueryParams, [...selectedCategory]);
      return;
    },
    [
      setIsSelectedAll,
      setSelectedCategory,
      getfilteredResult,
      removeCategoryFromSelectedCategoryList,
      addCategoryToSelectedCategoryList,
      searchQueryParams,
      selectedCategory
    ]
  );

  return [
    categoryList,
    categoryIdList,
    handleAllClick,
    handleCategoryClick,
    isSelectedAll,
    selectedCategory,
    isLoading,
    setIsLoading
  ];
}

export default useCategory;
