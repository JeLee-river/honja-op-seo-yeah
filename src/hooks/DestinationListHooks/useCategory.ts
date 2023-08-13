import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryListType } from '../../types/DestinationListTypes';
import { useSearchParams } from 'react-router-dom';
import { extractCategoryIdFromCategoryList } from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import useDestinations from './useDestinations';
import { getAllCategoryList } from '../../apis/destinationListAPI';

type useCategoryReturnType = {
  categoryList: CategoryListType[];
  categoryIdList: number[];
  handleAllClick: () => void;
  handleCategoryClick: (categoryId: number) => void;
  isSelectedAll: boolean;
  selectedCategory: number[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function useCategory(): useCategoryReturnType {
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCategoryAndIdList = useCallback(async () => {
    const res = await getAllCategoryList();
    setCategoryList(res?.data);
  }, [getAllCategoryList, setCategoryList]);

  useEffect(() => {
    getCategoryAndIdList();
  }, [getCategoryAndIdList]);

  const categoryIdList = useMemo(() => {
    return extractCategoryIdFromCategoryList(categoryList);
  }, [extractCategoryIdFromCategoryList, categoryList]);

  const [selectedCategory, setSelectedCategory] =
    useState<number[]>(categoryIdList);

  const handleAllClick = useCallback(() => {
    setIsLoading(true);
    setIsSelectedAll(true);
    setSelectedCategory(categoryIdList);
    return;
  }, [setIsLoading, setIsSelectedAll, setSelectedCategory]);

  // 필터 해제
  const removeCategoryFromSelectedCategoryList = useCallback(
    (targetCategoryId: number) => {
      return setSelectedCategory((prev) => {
        return (
          prev.filter((categoryId) => categoryId !== targetCategoryId) ?? []
        );
      });
    },
    [setSelectedCategory]
  );

  // useEffect(() => {
  //   console.log('selectedCategory 카테고리', selectedCategory);
  //   console.log('categoryIdList', categoryIdList);
  // }, [selectedCategory, categoryIdList]);

  //필터 추가
  const addCategoryToSelectedCategoryList = useCallback(
    (targetCategoryId: number) => {
      return setSelectedCategory((prev) => {
        return [...prev, targetCategoryId];
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
        return;
      }

      selectedCategory.includes(targetCategoryId)
        ? removeCategoryFromSelectedCategoryList(targetCategoryId)
        : addCategoryToSelectedCategoryList(targetCategoryId);
      return;
    },
    [
      setIsSelectedAll,
      setSelectedCategory,
      removeCategoryFromSelectedCategoryList,
      addCategoryToSelectedCategoryList,
      selectedCategory
    ]
  );

  return {
    categoryList,
    categoryIdList,
    handleAllClick,
    handleCategoryClick,
    isSelectedAll,
    selectedCategory,
    isLoading,
    setIsLoading
  };
}

export default useCategory;
