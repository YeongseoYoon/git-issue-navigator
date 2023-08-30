import React, { SyntheticEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Issue } from '../../types/issue';
import IssueItem from './IssueItem';
import errorImage from '../../assets/errorImage.png';

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

export default IssueDetail;
