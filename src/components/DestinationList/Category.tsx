import React, { useCallback, useEffect, useState } from 'react';
import styles from './Category.module.scss';
import useCategory from '../../hooks/DestinationListHooks/useCategory';

const DATA_LOADING_MESSAGE = {
  CATEGORY_LOADING: '카테고리 정보를 로딩 중입니다.'
};

function Category() {
  const [
    categoryList,
    ,
    handleAllClick,
    handleCategoryClick,
    isSelectedAll,
    selectedCategory,
    isLoading,
    setIsLoading
  ] = useCategory();

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
    </>
  );
}

export default Category;
