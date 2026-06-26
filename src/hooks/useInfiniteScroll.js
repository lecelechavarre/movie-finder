import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({ onLoadMore, hasMore, isLoading }) {
  const anchorRef = useRef(null);

  useEffect(() => {
    if (!anchorRef.current || !hasMore || isLoading) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '220px' }
    );

    observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  return anchorRef;
}
