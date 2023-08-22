import React, { useCallback, useEffect, useState } from 'react';
import styles from './Category.module.scss';
import useCategory from '../../hooks/DestinationListHooks/useCategory';
import Destinations from './Destinations';

const DATA_LOADING_MESSAGE = {
  CATEGORY_LOADING: '카테고리 정보를 로딩 중입니다.'
};

type categoryPropsType = {
  mainTagRef: React.RefObject<HTMLElement>;
};

function Category({ mainTagRef }: categoryPropsType) {
  const { categoryList, categoryIdList } = useCategory();

  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  useEffect(() => {
    setSelectedCategory(categoryIdList);
  }, [setSelectedCategory, categoryIdList]);

  useEffect(() => {
    if (isLoading) {
      const debouncer = setTimeout(() => {
        setIsLoading(false);
      }, 150);

      return () => {
        clearTimeout(debouncer);
      };
    }
  }, [isLoading, setIsLoading]);

  const handleAllClick = useCallback(() => {
    setIsLoading(true);
    setIsSelectedAll(true);
    setSelectedCategory(categoryIdList);
    return;
  }, [setIsLoading, setIsSelectedAll, setSelectedCategory, categoryIdList]);

  // 필터 해제
  const removeCategoryFromSelectedCategoryList = useCallback(
    (targetCategoryId: number) => {
      setSelectedCategory((prev) => {
        return (
          prev.filter((categoryId) => categoryId !== targetCategoryId) ?? []
        );
      });
    },
    [setSelectedCategory]
  );

  //필터 추가
  const addCategoryToSelectedCategoryList = useCallback(
    (targetCategoryId: number) => {
      setSelectedCategory((prev) => {
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
      setIsLoading,
      setIsSelectedAll,
      isSelectedAll,
      selectedCategory,
      setSelectedCategory,
      removeCategoryFromSelectedCategoryList,
      addCategoryToSelectedCategoryList
    ]
  );

  return (
    <>
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

        {categoryList.map((category, index) => (
          <button
            key={index}
            value={category.id}
            onClick={() => handleCategoryClick(category.id)}
            disabled={isLoading}
            className={
              selectedCategory.includes(category.id)
                ? styles.activeSelectedButton
                : styles.selectedButton
            }
            id={
              isSelectedAll
                ? styles[`Category-${category.id}`]
                : selectedCategory.includes(category.id)
                ? styles[`activeCategory-${category.id}`]
                : styles[`Category-${category.id}`]
            }
          >
            {category.name}
          </button>
        ))}
      </div>
      <Destinations
        mainTagRef={mainTagRef}
        categoryList={categoryList}
        selectedCategory={selectedCategory}
      />
    </>
  );
}

export default Category;
