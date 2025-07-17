'use client';

import useAuth from '@/components/AuthRoute';
import Dashboard from './dashboard/page';

export default () => {
  useAuth();

  return (
    <>
      <Dashboard />
    </>
  );
};