import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile =
      /Android|iPhone|Windows Phone|BlackBerry/i.test(navigator.userAgent) ||
      window.innerWidth < 640;

    navigate(isMobile ? '/mobile' : '/gui', { replace: true });
  }, [navigate]);

  return null;
};

export default App;
