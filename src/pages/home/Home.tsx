import React from 'react';
import { Link } from 'react-router-dom';

import { useOctokitFetch } from '../../hooks/useOctokitFetch';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants/constants';
import { Issue } from '../../types/issue';
import IssueItem from '../../components/IssueItem';

const Home = () => {
  const { data: issues } = useOctokitFetch<Issue[]>(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments&state=open`,
    {
      owner: 'OWNER',
      repo: 'REPO',
      issue_number: 'ISSUE_NUMBER',
    },
  );

  return (
    <>
      {issues?.map(issue => (
        <Link
          key={`${issue?.id}-${issue?.created_at}`}
          to={`/detail/${issue?.number}`}
          className="cursor-pointer"
        >
          <div className="flex flex-row m-3 items-center">
            <IssueItem issue={issue} />
          </div>
        </Link>
      ))}
    </>
  );
};

export default Home;
