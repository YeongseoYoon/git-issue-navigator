import React from 'react';
import { Link } from 'react-router-dom';

import {
  IMAGE_HREF,
  IMAGE_URL,
  ORGANIZATION_NAME,
  REPOSITORY_NAME,
} from '../../constants/constants';
import { Issue } from '../../types/issue';
import { ErrorBoundary, Loading, IssueItem } from '../../components';
import { useOctokitListFetch, useIntersectionObserver } from '../../hooks';

type IssueListProps = {
  issues?: Issue[];
  observerElementRef: (node: HTMLDivElement) => void;
};

const Home = () => {
  return (
    <ErrorBoundary>
      <IssueListFetcher />
    </ErrorBoundary>
  );
};

const IssueListFetcher = () => {
  const {
    data: issues,
    isLoading,
    isInfiniteLoading,
    error,
    refetch,
  } = useOctokitListFetch(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments&state=open`,
    {
      owner: 'OWNER',
      repo: 'REPO',
    },
  );
  const { observerElementRef } = useIntersectionObserver({
    callback: refetch,
    isLoading: isInfiniteLoading,
  });

  if (isLoading) return <Loading />;

  if (error) throw error;

  return <IssueList issues={issues} observerElementRef={observerElementRef} />;
};

const IssueList = ({ issues, observerElementRef }: IssueListProps) => {
  return (
    <React.Fragment>
      {issues?.map((issue, index) => {
        const isAdvertismentIndex = index % 5 === 4;
        return (
          <React.Fragment key={issue.id}>
            <Link
              key={`${issue?.id}-${issue?.created_at}`}
              to={`/detail/${issue?.number}`}
              className="cursor-pointer"
            >
              <div className="flex flex-row items-center m-3">
                <IssueItem issue={issue} />
              </div>
            </Link>
            {isAdvertismentIndex && <AdvertismentSection />}
          </React.Fragment>
        );
      })}
      <div ref={observerElementRef} />
    </React.Fragment>
  );
};

const AdvertismentSection = () => {
  return (
    <a href={IMAGE_HREF} target="_blank" rel="noopener noreferrer">
      <div className="flex justify-center w-full m-3 border cursor-pointer">
        <img src={IMAGE_URL} alt="Ad-Image" />
      </div>
    </a>
  );
};

export default Home;
