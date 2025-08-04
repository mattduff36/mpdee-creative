import { Metadata } from 'next';
import LoginForm from '../../../components/accounts/LoginForm';

export const metadata: Metadata = {
  title: 'Login | MPDEE Creative Accounting',
  description: 'Sign in to access the MPDEE Creative accounting system',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
} 