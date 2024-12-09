import React, { ReactNode, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BACKEND_URL } from '@/consts.ts';

type Props = {
  element: ReactNode;
};

const Tracking: React.FC<Props> = ({ element }) => {
  const loaded = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    if (!searchParams.has('t')) return;

    const trackingUrl = searchParams.get('t');

    void fetch(`${BACKEND_URL}/tracking/${trackingUrl}`, {
      method: 'PUT',
    });

    setSearchParams(prev => {
      prev.delete('t');
      return prev;
    });
  });

  return element;
};

export default Tracking;
