import React, { SyntheticEvent } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useOctokitFetch } from '../../hooks/useOctokitFetch';
import IssueItem from '../../components/IssueItem';
import { Issue } from '../../types/issue';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants/constants';
import Loading from '../../components/Loading';
import errorImage from '../../assets/errorImage.png';

const Detail = () => {
  const { issueNumber } = useParams();
  const { data: issue, isLoading } = useOctokitFetch<Issue>(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues/${issueNumber}`,
    {
      owner: 'OWNER',
      repo: 'REPO',
      issue_number: 'ISSUE_NUMBER',
    },
  );

  const handleErrorImage = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = errorImage;
  };
  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-row items-center m-3">
            <img
              src={issue?.user.avatar_url}
              className="w-12 h-12 mr-2"
              onError={handleErrorImage}
            />
            {issue && <IssueItem issue={issue} />}
          </div>
          <div className="p-2 font-light">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue?.body || ''}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
