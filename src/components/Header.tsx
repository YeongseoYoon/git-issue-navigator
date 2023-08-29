import React from 'react';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';

const Header = () => {
  return (
    <header className="flex items-center justify-center p-2 border-gray-400 border border-t-0 h-12">
      <div className="flex mx-auto justify-center">
        <h1 className="text-lg font-semibold">{ORGANIZATION_NAME}</h1>
        <h1 className="text-lg font-semibold mx-1">/</h1>
        <h1 className="text-lg font-semibold">{REPOSITORY_NAME}</h1>
      </div>
    </header>
  );
};

export default Header;
