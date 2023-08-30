import { useEffect, useState } from 'react';
import { octokit } from '../apis/api';
import { Issue } from '../types/issue';

export const useOctokitFetch = <T = Issue | Issue[]>(
  url: string,
  routeParams: Record<string, string | number>,
) => {
  const [data, setData] = useState<T | undefined>();

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
      } catch (error) {
        console.error('Request error:', error);
        throw error;
      }
    })();
  }, []);

  return { data };
};
