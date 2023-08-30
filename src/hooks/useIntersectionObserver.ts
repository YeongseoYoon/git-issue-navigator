import { useCallback, useRef } from 'react';

type UseIntersectionObserverProps = {
  callback: () => void;
  isLoading?: boolean;
};

const useIntersectionObserver = ({ callback, isLoading }: UseIntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observerElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !isLoading) {
            callback();
          }
        },
        { rootMargin: '400px 0px' },
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [callback],
  );

  return { observerElementRef };
};

export default useIntersectionObserver;
