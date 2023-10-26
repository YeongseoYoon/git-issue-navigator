import React from 'react';
import { useParams } from 'react-router';

import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants/constants';
import { ErrorBoundary, Loading } from '../../components';
import { useOctokitDetailFetch } from '../../hooks';
import IssueDetail from '../../components/Issue/IssueDetail';

const Detail = () => {
  const { issueNumber = 0 } = useParams();
  const {
    data: issue,
    isLoading,
    error,
  } = useOctokitDetailFetch(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues/${issueNumber}`,
    {
      owner: ORGANIZATION_NAME,
      repo: REPOSITORY_NAME,
      issue_number: issueNumber,
    },
  );

  if (isLoading) return <Loading />;

  if (error) throw error;
  return (
    <div className="flex flex-col h-full">
      <IssueDetail issue={issue} />
    </div>
  );
};

export default Detail;
