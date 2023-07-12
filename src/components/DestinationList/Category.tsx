import React, { useCallback, useEffect, useState } from 'react';
import { CategoryListType } from '../../types/DestinationListTypes';

// import { getDestinationListByTitleAndCategoryId } from '../../apis/destinationListAPI';
import styles from './Category.module.scss';

type CategoryPropsTypes = {
  categoryList: CategoryListType[];
  selectedCategory: number[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<number[]>>;
  isSelectedAll: boolean;
  setIsSelectedAll: React.Dispatch<React.SetStateAction<boolean>>;
  handleAllClick: () => void;
  handleCategoryClick: (categoryId: number) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DATA_LOADING_MESSAGE = {
  CATEGORY_LOADING: '카테고리 정보를 로딩 중입니다.'
};

// const CATEGORIES_ID_LIST = Array.from(CATEGORIES_ID.keys());

function Category({
  categoryList,
  selectedCategory,
  setSelectedCategory,
  isSelectedAll,
  setIsSelectedAll,
  handleAllClick,
  handleCategoryClick,
  isLoading,
  setIsLoading
}: CategoryPropsTypes) {
  useEffect(() => {
    if (isLoading) {
      const debouncer = setTimeout(() => {
        setIsLoading(false);
      }, 150);

      return () => {
        clearTimeout(debouncer);
      };
    }
  }, [isLoading]);

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

          {categoryList.map((categoryList, index) => (
            <button
              key={index}
              value={categoryList.id}
              onClick={() => handleCategoryClick(categoryList.id)}
              disabled={isLoading}
              className={
                selectedCategory?.includes(categoryList.id)
                  ? styles.activeSelectedButton
                  : styles.selectedButton
              }
              id={
                isSelectedAll
                  ? styles[`Category-${categoryList.id}`]
                  : selectedCategory?.includes(categoryList.id)
                  ? styles[`activeCategory-${categoryList.id}`]
                  : styles[`Category-${categoryList.id}`]
              }
            >
              {categoryList.name}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export default Category;
