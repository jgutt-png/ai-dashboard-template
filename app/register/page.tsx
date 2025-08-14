import { RegistrationFormWithImages } from '@/components/registration-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account to access your dashboard',
};

export default function RegisterPage() {
  return <RegistrationFormWithImages mode="register" />;
}