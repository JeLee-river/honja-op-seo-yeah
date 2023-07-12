import {
  CategoryListType,
  DestinationsType
} from '../../../types/DestinationListTypes';

export const extractCategoryIdFromCategoryList = (
  categoryList: CategoryListType[]
) => {
  return categoryList.map((category) => category.id);
};

export const changeCategoryIdIntoName = (
  categoryList: CategoryListType[],
  destinationList: DestinationsType[]
) => {
  const specifiedCategoryId = categoryList.map((category) => category.id);
  const addCategoryName = destinationList.map((destination) => {
    const targetIndex = specifiedCategoryId.indexOf(destination.id);
    const categoryName =
      targetIndex === -1 ? '정보 없음' : categoryList[targetIndex].name;
    return { ...destination, category_name: categoryName };
  });
  return addCategoryName;
};

export const isNullishSearchInput = (input: string) => {
  const trimmedInput = input.replace(/ /g, '');
  return trimmedInput === '';
};
