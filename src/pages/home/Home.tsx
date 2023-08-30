import React from 'react';
import { Link } from 'react-router-dom';

import { useOctokitFetch } from '../../hooks/useOctokitFetch';
import {
  IMAGE_HREF,
  IMAGE_URL,
  ORGANIZATION_NAME,
  REPOSITORY_NAME,
} from '../../constants/constants';
import { Issue } from '../../types/issue';
import IssueItem from '../../components/IssueItem';
import Loading from '../../components/Loading';
import ErrorBoundary from '../../components/ErrorBoundary';

const Home = () => {
  const {
    data: issues,
    isLoading,
    error,
  } = useOctokitFetch<Issue[]>(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments&state=open`,
    {
      owner: 'OWNER',
      repo: 'REPO',
    },
  );

  if (error) return <ErrorBoundary requestError={error} />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {issues?.map((issue, index) => (
            <>
              <Link
                key={`${issue?.id}-${issue?.created_at}`}
                to={`/detail/${issue?.number}`}
                className="cursor-pointer"
              >
                <div className="flex flex-row items-center m-3">
                  <IssueItem issue={issue} />
                </div>
              </Link>
              {index % 5 === 4 && (
                <a href={IMAGE_HREF} target="_blank" rel="noopener noreferrer">
                  <div className="flex justify-center w-full m-3 border cursor-pointer">
                    <img src={IMAGE_URL} alt="Ad-Image" />
                  </div>
                </a>
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Home;
