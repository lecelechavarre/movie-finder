import { useEffect, useState } from 'react';

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let active = true;
    setError(null);
    setIsLoading(true);

    fetcher()
      .then((result) => {
        if (!active) return;
        setData(result);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [version, ...deps]);

  const refetch = () => setVersion((current) => current + 1);

  return { data, isLoading, error, refetch };
}
