import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { TimelinePage } from './pages/TimelinePage';
import { MessagesPage } from './pages/MessagesPage';
import { SpecialPage } from './pages/SpecialPage';
import { AdminPage } from './pages/AdminPage';
import { AdminUpload } from './components/AdminUpload';
import { LoginPage } from './components/LoginPage';

interface RouterConfig {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const ProtectedRoute = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AdminProtectedRoute = () => {
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminUpload token={token} onLogout={() => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  }} />;
};

export const createAppRouter = ({ isLoggedIn, onLogin, onLogout }: RouterConfig) => {
  return createBrowserRouter([
    {
      path: '/login',
      element: isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={onLogin} />,
    },
    {
      path: '/admin',
      element: <AdminPage />,
    },
    {
      path: '/admin/dashboard',
      element: <AdminProtectedRoute />,
    },
    {
      path: '/',
      element: <ProtectedRoute isLoggedIn={isLoggedIn} />,
      children: [
        {
          element: <Layout onLogout={onLogout} />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'gallery', element: <GalleryPage /> },
            { path: 'timeline', element: <TimelinePage /> },
            { path: 'messages', element: <MessagesPage /> },
            { path: 'special', element: <SpecialPage /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);
};
