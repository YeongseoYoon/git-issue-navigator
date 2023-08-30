import React, { SyntheticEvent } from 'react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Issue } from '../../types/issue';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../../constants/constants';
import errorImage from '../../assets/errorImage.png';
import { ErrorBoundary, IssueItem, Loading } from '../../components';
import { useOctokitDetailFetch } from '../../hooks';

const Detail = () => {
  const { issueNumber } = useParams();
  return (
    <div className="flex flex-col h-full">
      <ErrorBoundary>
        <IssueDetailFetcher issueNumber={issueNumber} />
      </ErrorBoundary>
    </div>
  );
};

const IssueDetailFetcher = ({ issueNumber }: { issueNumber: string | undefined }) => {
  const {
    data: issue,
    isLoading,
    error,
  } = useOctokitDetailFetch(
    `GET /repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues/${issueNumber}`,
    {
      owner: 'OWNER',
      repo: 'REPO',
      issue_number: 'ISSUE_NUMBER',
    },
  );

  if (isLoading) return <Loading />;

  if (error) throw error;

  return <IssueDetail issue={issue} />;
};

type IssueDetailProps = {
  issue?: Issue;
};

const IssueDetail = ({ issue }: IssueDetailProps) => {
  const handleErrorImage = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = errorImage;
  };
  return (
    <React.Fragment>
      <div className="flex flex-row items-center m-3">
        <img src={issue?.user.avatar_url} className="w-12 h-12 mr-2" onError={handleErrorImage} />
        <IssueItem issue={issue} />
      </div>
      <div className="p-2 font-light">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue?.body || ''}</ReactMarkdown>
      </div>
    </React.Fragment>
  );
};

export default Detail;
