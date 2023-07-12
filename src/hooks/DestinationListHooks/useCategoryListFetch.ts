import { useCallback, useState } from 'react';
import { getAllCategoryList } from '../../apis/destinationListAPI';
import { CategoryListType } from '../../types/DestinationListTypes';

function useCategoryListFetch(): [
  CategoryListType[],
  React.Dispatch<React.SetStateAction<CategoryListType[]>>
] {
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([]);

  const getCategoryList = useCallback(async () => {
    const res = await getAllCategoryList();
    setCategoryList(res?.data);
  }, [getAllCategoryList, setCategoryList]);

  getCategoryList();
  return [categoryList, setCategoryList];
}

export default useCategoryListFetch;
