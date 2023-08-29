import { octokit } from '../api/api';

export const useOctokitListFetch = async <T>(
  url: string,
  routeParams: Record<string, string | number>,
): Promise<T> => {
  try {
    const response = await octokit.request(url, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      ...routeParams,
    });
    return response.data;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
};
