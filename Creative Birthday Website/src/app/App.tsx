import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createAppRouter } from './routes';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    if (!isLoggedIn) return;

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > 5 * 60 * 1000) {
        handleLogout();
      }
    }, 1000);

    const updateActivity = () => setLastActivity(Date.now());

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      clearInterval(checkInactivity);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, [isLoggedIn, lastActivity]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setLastActivity(Date.now());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const router = createAppRouter({ 
    isLoggedIn, 
    onLogin: handleLogin, 
    onLogout: handleLogout 
  });

  return <RouterProvider router={router} />;
}
