import React from 'react';
import { Link } from 'react-router-dom';

import { Issue } from '../../types/issue';
import { IMAGE_HREF, IMAGE_URL } from '../../constants/constants';
import IssueItem from './IssueItem';

type IssueListProps = {
  issues?: Issue[];
  observerElementRef: (node: HTMLDivElement) => void;
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
            {isAdvertismentIndex && (
              <a href={IMAGE_HREF} target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center w-full m-3 border cursor-pointer">
                  <img src={IMAGE_URL} alt="Ad-Image" />
                </div>
              </a>
            )}
          </React.Fragment>
        );
      })}
      <div ref={observerElementRef} />
    </React.Fragment>
  );
};

export default IssueList;
