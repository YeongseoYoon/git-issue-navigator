import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>페이지를 찾을 수 없습니다.</div>;
    }
    if (error.status === 410) {
      return <div>페이지를 찾을 수 없습니다.</div>;
    }
    if (error.status === 500) {
      return <div>뭔가 문제가 생겼어요!</div>;
    }
  }

  return <div>뭔가 문제가 생겼어요!</div>;
};

export default RouteErrorBoundary;
