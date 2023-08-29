import React from 'react';
import { ORGANIZATION_NAME, REPOSITORY_NAME } from '../constants/constants';

const Header = () => {
  return (
    <header className="p-2 border border-b-2">
      <div className="flex max-w-2xl mx-auto justify-center">
        <h1 className="text-lg font-semibold">{ORGANIZATION_NAME}</h1>
        <h1 className="text-lg font-semibold mx-1">/</h1>

        <h1 className="text-lg font-semibold">{REPOSITORY_NAME}</h1>
      </div>
    </header>
  );
};

export default Header;
