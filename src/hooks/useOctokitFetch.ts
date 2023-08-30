import { useEffect, useState } from 'react';
import { octokit } from '../apis/api';
import { Issue } from '../types/issue';
import { RequestError } from '@octokit/request-error';

export const useOctokitFetch = <T = Issue | Issue[]>(
  url: string,
  routeParams: Record<string, string | number>,
) => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<RequestError>();
  useEffect(() => {
    (async () => {
      try {
        const response = await octokit.request(url, {
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
          ...routeParams,
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof RequestError) {
          setError(error);
        }
      }
    })();
  }, []);

  return { data, isLoading, error };
};
