import { useCallback, useEffect, useMemo, useState } from 'react';
import { CategoryListType } from '../../types/DestinationListTypes';
import { extractCategoryIdFromCategoryList } from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import { getAllCategoryList } from '../../apis/destinationListAPI';

type useCategoryReturnType = {
  categoryList: CategoryListType[];
  categoryIdList: number[];
};

function useCategory(): useCategoryReturnType {
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([]);

  const getCategoryAndIdList = useCallback(async () => {
    const res = await getAllCategoryList();
    setCategoryList(res?.data);
  }, [getAllCategoryList]);

  useEffect(() => {
    getCategoryAndIdList();
  }, [getCategoryAndIdList]);

  // useEffect(() => {
  //   const getCategoryAndIdList = async () => {
  //     const res = await getAllCategoryList();
  //     setCategoryList(res?.data);
  //   };
  //   getCategoryAndIdList();
  // }, []);

  const categoryIdList = useMemo(() => {
    return extractCategoryIdFromCategoryList(categoryList);
  }, [extractCategoryIdFromCategoryList, categoryList]);

  return {
    categoryList,
    categoryIdList
  };
}

export default useCategory;
