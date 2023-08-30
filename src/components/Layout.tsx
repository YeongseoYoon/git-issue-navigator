import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center min-h-screen m-auto h-min">
      <div className="w-4/5">{children}</div>
    </div>
  );
};

export default Layout;
