import { createBrowserRouter, Navigate } from 'react-router-dom';
import { GuestRoute } from '@/features/auth/components/guest-route';
import { ProtectedRoute } from '@/features/auth/components/protected-route';
import { AccountPage } from '@/features/auth/pages/account-page';
import { ForgotPasswordPage } from '@/features/auth/pages/forgot-password-page';
import { LoginPage } from '@/features/auth/pages/login-page';
import { RegisterPage } from '@/features/auth/pages/register-page';
import { ResetPasswordPage } from '@/features/auth/pages/reset-password-page';
import { SessionsPage } from '@/features/auth/pages/sessions-page';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { UsersPage } from '@/features/users/pages/users-page';
import { PrivacyPolicyPage } from '@/features/legal/pages/privacy-policy-page';
import { AppLayout } from '@/shared/components/layout/app-layout';

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />
      }
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'sessions',
            element: <SessionsPage />,
          },
          {
            path: 'account',
            element: <AccountPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
