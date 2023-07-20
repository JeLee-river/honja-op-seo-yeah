import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isNullishSearchInput } from '../../components/DestinationList/Utils/DestinationFiltersUtils';
import useDestinationsFetch from './useDestinationsFetch';
import useCategory from './useCategory';

type useSearchReturnType = [
  handleSubmitQuery: (e: React.ChangeEvent<HTMLFormElement>) => void
];

function useSearch(): useSearchReturnType {
  const [, setSearchParams] = useSearchParams();
  const [, setIsShowAlert] = useState<boolean>(false);
  const [, categoryIdList] = useCategory();
  const [getfilteredResult] = useDestinationsFetch();

  const navigate = useNavigate();

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsUserSearched(() => true);
    const submittedQuery = e.target.searchQuery.value;
    if (isNullishSearchInput(submittedQuery)) {
      setIsShowAlert(true);
      navigate('/destination/list');
      return;
    }
    const searchQueryString = encodeURIComponent(submittedQuery);
    if (searchQueryString !== null) {
      setSearchParams(`?search=${searchQueryString}`);
      getfilteredResult(searchQueryString, categoryIdList);
      console.log('검색시 실행');
    }
    return;
  };

  return [handleSubmitQuery];
}

export default useSearch;
