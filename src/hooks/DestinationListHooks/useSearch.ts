import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isNullishSearchInput } from '../../components/DestinationList/Utils/DestinationFiltersUtils';

type useSearchReturnType = {
  handleSubmitQuery: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

function useSearch(): useSearchReturnType {
  const [, setSearchParams] = useSearchParams();
  const [, setIsShowAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedQuery = e.target.searchQuery.value;
    if (isNullishSearchInput(submittedQuery)) {
      setIsShowAlert(true);
      navigate('/destination/list');
      return;
    }
    const searchQueryString = encodeURIComponent(submittedQuery);
    if (searchQueryString !== null) {
      setSearchParams(`?search=${searchQueryString}`);
    }
    return;
  };

  return { handleSubmitQuery };
}

export default useSearch;
