import React, { useEffect, useMemo, useState } from 'react';
// import { DestinationsType } from '../../types/DestinationListTypes';
import styles from './Search.module.scss';
// import Category from './Category';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertModal from '../common/Alert/AlertModal';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import useSearch from '../../hooks/DestinationListHooks/useSearch';

const ALERT_PROPS = {
  NulllishQueryMessage: '검색어를 입력해주세요.',
  showTitle: false
};

// type SearchPropsType = {
//   selectedCategory: number[];
//   getfilteredResult: (searchQuery: string, selectedCategory: number[]) => void;
//   isShowAlert: boolean;
//   setIsShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
//   handleSubmitQuery: (e: React.ChangeEvent<HTMLFormElement>) => void;
// };

function Search() {
  const { handleSubmitQuery } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const searchQueryParams = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const handleOnSearchQueryConfirm = () => {
    setIsShowAlert(false);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <form className={styles.searchBar} onSubmit={handleSubmitQuery}>
          <TextField
            className={styles.inputBar}
            type='text'
            name='searchQuery'
            placeholder='목적지를 입력해주세요.'
            style={{ width: '350px' }}
            size='small'
            defaultValue={searchQueryParams}
            key={searchQueryParams}
            sx={{
              width: '100%',
              '& label.Mui-focused': { color: '#ef6d00' },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#fe9036',
                  borderWidth: '1px'
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton type='submit'>
                    <BiSearch />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </div>
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.NulllishQueryMessage}
          onConfirm={handleOnSearchQueryConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default Search;
