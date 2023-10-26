import React from 'react';

import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants/constants';
import { Loading, IssueList } from '../../components';
import { useOctokitListFetch, useIntersectionObserver } from '../../hooks';

const Home = () => {
  const {
    data: issues,
    isLoading,
    isInfiniteLoading,
    error,
    refetch,
  } = useOctokitListFetch(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments&state=open`,
    {
      owner: ORGANIZATION_NAME,
      repo: REPOSITORY_NAME,
    },
  );
  const { observerElementRef } = useIntersectionObserver({
    callback: refetch,
    isLoading: isInfiniteLoading,
  });

  if (isLoading) return <Loading />;

  if (error) throw error;

  return (
    <IssueList
      issues={issues}
      observerElementRef={observerElementRef}
      isInfiniteLoading={isInfiniteLoading}
    />
  );
};

export default Home;
