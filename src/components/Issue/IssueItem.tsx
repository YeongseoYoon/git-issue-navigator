import React from 'react';

import { Issue } from '../../types/issue';
import { formatDateToKoreanDate } from '../../utils';

interface IssueItemProps {
  issue?: Issue;
}

const IssueItem = ({ issue }: IssueItemProps) => {
  return (
    <div className="flex flex-col w-full p-1 border-b-2">
      <div className="flex flex-row justify-between">
        <div className="mb-2 font-bold">
          <span className="mr-3">#{issue?.number}</span>
          <span>{issue?.title}</span>
        </div>
        <div className="min-w-fit">
          <span className="text-xs font-light">코멘트: {issue?.comments}</span>
        </div>
      </div>
      <div className="text-sm font-light">
        <span className="mr-2">작성자: {issue?.user.login},</span>
        <span>작성일: {formatDateToKoreanDate(issue?.created_at)}</span>
      </div>
    </div>
  );
};

export default IssueItem;
