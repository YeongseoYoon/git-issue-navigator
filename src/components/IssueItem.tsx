import React from 'react';

import { Issue } from '../types/issue';
import formatDateToKoreanDate from '../utils/formatDateToKoreanDate';

interface IssueItemProps {
  issue: Issue;
}

const IssueItem = ({ issue }: IssueItemProps) => {
  return (
    <div className="flex flex-col border-b-2 mx-2 p-1 w-full">
      <div className="flex flex-row justify-between">
        <div className="font-bold mb-2">
          <span className="mr-3">#{issue?.number}</span>
          <span>{issue?.title}</span>
        </div>
        <div className="w-auto">
          <span className="text-xs font-light break-keep">코멘트: {issue?.comments}</span>
        </div>
      </div>
      <div className="font-light text-sm">
        <span className="mr-2">작성자: {issue?.user.login},</span>
        <span>작성일: {formatDateToKoreanDate(issue?.created_at)}</span>
      </div>
    </div>
  );
};

export default IssueItem;
