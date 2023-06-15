import React, { useCallback, useEffect, useState } from 'react';
import {
  CategoryListType,
  DestinationsType,
  specifiedCategoryDestinationsType
} from '../../types/DestinationListTypes';
import Destinations from './Destinations';
import {
  getAllCategoryList,
  getDestinationListByTitleAndCategoryId
} from '../../apis/destinationListAPI';
import styles from './Category.module.scss';

type CategoryPropsTypes = {
  rankedDestinations: DestinationsType[] | [];
  isUserSearched: boolean;
  searchQueryParam: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CATEGORIES_ID = new Map([
  [12, '관광지'],
  [14, '문화시설'],
  [15, '축제공연행사'],
  [25, '여행코스'],
  [28, '레포츠'],
  [32, '숙박'],
  [38, '쇼핑'],
  [39, '음식점']
]);

const DATA_LOADING_MESSAGE = {
  CATEGORY_LOADING: '카테고리 정보를 로딩 중입니다.'
};

const CATEGORIES_ID_LIST = Array.from(CATEGORIES_ID.keys());

function Category({
  rankedDestinations,
  isUserSearched,
  searchQueryParam,
  isLoading,
  setIsLoading
}: CategoryPropsTypes) {
  const [selectedCategory, setSelectedCategory] = useState<number[]>([
    ...CATEGORIES_ID_LIST
  ]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    specifiedCategoryDestinationsType[] | []
  >([]);
  const [categoryList, setCategoryList] = useState<CategoryListType[] | null>(
    null
  );
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);

  const getAllCategoryData = useCallback(async () => {
    const res = await getAllCategoryList();
    const categoryListData = res?.data;
    setCategoryList(() => categoryListData);
    return;
  }, [setCategoryList]);

  useEffect(() => {
    getAllCategoryData();
  }, [getAllCategoryData]);

  //카테고리 id => name 변환 함수
  const changeCategoryIdIntoName = useCallback(
    (destinationList: DestinationsType[]) => {
      const specifiedCatogory = destinationList?.map((el) => {
        const categoryName =
          CATEGORIES_ID.get(el.category_id) ??
          DATA_LOADING_MESSAGE.CATEGORY_LOADING;
        return { ...el, category_name: categoryName };
      });
      return specifiedCatogory;
    },
    [CATEGORIES_ID]
  );

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

  //카테고리 클릭(전체 X)
  const handleCategoryClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setIsLoading(true);
    const { value } = e.target as HTMLButtonElement;
    const targetCategoryId = Number(value);
    setIsSelectedAll(false);
    if (selectedCategory.length === categoryList?.length) {
      const newSelectedCategory = [targetCategoryId];
      setSelectedCategory(newSelectedCategory);

      return;
    }

    selectedCategory.includes(targetCategoryId)
      ? removeCategoryFromSelectedCategoryList(targetCategoryId)
      : addCategoryToSelectedCategoryList(targetCategoryId);

    return;
  };

  const handleAllClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true);
    setIsSelectedAll(true);
    setSelectedCategory([...CATEGORIES_ID_LIST]);

    return;
  };

  useEffect(() => {
    const debouncer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => {
      clearTimeout(debouncer);
    };
  }, [isLoading]);

  //필터링 로직(유저 검색 O/X 분기)
  useEffect(() => {
    if (selectedCategory.length <= 0) {
      return;
    }
    if (!isUserSearched) {
      const categorizedRankingDestinations =
        rankedDestinations?.filter((destination) => {
          return selectedCategory.includes(destination?.category_id);
        }) ?? [];
      setFilteredDestinations(() =>
        changeCategoryIdIntoName(categorizedRankingDestinations)
      );
    }
    return;
  }, [selectedCategory, rankedDestinations, isUserSearched]);

  const getCategorizedSearchingData = useCallback(async () => {
    const res = await getDestinationListByTitleAndCategoryId(
      selectedCategory,
      searchQueryParam
    );
    const categorizedSearchingDestinationsList = res?.data.destinations;
    setFilteredDestinations(() =>
      changeCategoryIdIntoName(categorizedSearchingDestinationsList)
    );
    return;
  }, [
    selectedCategory,
    searchQueryParam,
    setFilteredDestinations,
    isUserSearched
  ]);

  useEffect(() => {
    setIsLoading(true);
    getCategorizedSearchingData();
  }, [getCategorizedSearchingData, setIsLoading, isUserSearched]);

  return (
    <>
      <section className={styles.categoryWrapper}>
        <div className={styles.categoryContainer}>
          <button
            onClick={handleAllClick}
            id={
              isSelectedAll
                ? styles.activeSelectedAllButton
                : styles.selectedAllButton
            }
            disabled={isLoading}
          >
            전체
          </button>

          {CATEGORIES_ID_LIST?.map((categoryId, index) => (
            <button
              key={index}
              value={categoryId}
              onClick={handleCategoryClick}
              disabled={isLoading}
              className={
                selectedCategory?.includes(categoryId)
                  ? styles.activeSelectedButton
                  : styles.selectedButton
              }
              id={
                isSelectedAll
                  ? styles[`Category-${categoryId}`]
                  : selectedCategory?.includes(categoryId)
                  ? styles[`activeCategory-${categoryId}`]
                  : styles[`Category-${categoryId}`]
              }
            >
              {CATEGORIES_ID.get(categoryId)}
            </button>
          ))}
        </div>
      </section>
      <Destinations
        filteredDestinations={filteredDestinations}
        isLoading={isLoading}
      />
    </>
  );
}

export default Category;
