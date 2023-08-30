import { useEffect, useCallback, useState } from 'react';
import { octokit } from '../apis/api';
import { Issue } from '../types/issue';

import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';

const useOctokitListFetch = (
  url: string = `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments&state=open`,
  routeParams: Record<string, string | number>,
) => {
  const [data, setData] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);

  const fetchOptions = {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    ...routeParams,
  };

  const fetchList = useCallback((page: number) => {
    setIsInfiniteLoading(true);
    octokit
      .request(`${url}&page=${page}`, fetchOptions)
      .then(response => {
        setData(prev => [...prev, ...response.data]);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfiniteLoading(false);
      });
  }, []);

  const refetch = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetchList(page);
  }, [fetchList, page]);

  return { data, isLoading, isInfiniteLoading, error, refetch };
};

export default useOctokitListFetch;
