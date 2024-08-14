"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.2,
});

const useRouteChange = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
      setIsLoading(true);
    };

    const handleComplete = () => {
      setTimeout(() => {
        NProgress.done();
        setIsLoading(false);
      }, 500);
    };

    handleStart();

    const timer = setTimeout(() => {
      handleComplete();
    }, 1000);

    return () => {
      clearTimeout(timer);
      NProgress.done();
      setIsLoading(false);
    };
  }, [pathname]);

  return isLoading;
};

export default useRouteChange;
