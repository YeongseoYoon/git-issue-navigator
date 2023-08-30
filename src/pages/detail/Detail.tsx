import React from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useOctokitFetch } from '../../hooks/useOctokitFetch';
import IssueItem from '../../components/IssueItem';
import { Issue } from '../../types/issue';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants/constants';

const Detail = () => {
  const { issueNumber } = useParams();
  const { data: issue } = useOctokitFetch<Issue>(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues/${issueNumber}`,
    {
      owner: 'OWNER',
      repo: 'REPO',
      issue_number: 'ISSUE_NUMBER',
    },
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row m-3 items-center">
        <img src={issue?.user.avatar_url} className="w-12 h-12 mr-2" />
        {issue && <IssueItem issue={issue} />}
      </div>
      <div className="p-2 font-light">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue?.body || ''}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Detail;
