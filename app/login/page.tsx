import { RegistrationFormWithImages } from '@/components/registration-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account to access your dashboard',
};

export default function AuthenticationPage() {
  return <RegistrationFormWithImages mode="login" />;
}
