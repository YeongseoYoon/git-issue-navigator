import { useEffect, useState } from 'react';
import { octokit } from '../apis/api';
import { Issue } from '../types/issue';

const useOctokitDetailFetch = (url: string, routeParams: Record<string, string | number>) => {
  const [data, setData] = useState<Issue>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const fetchOptions = {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    ...routeParams,
  };

  useEffect(() => {
    octokit
      .request(url, fetchOptions)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};

export default useOctokitDetailFetch;
