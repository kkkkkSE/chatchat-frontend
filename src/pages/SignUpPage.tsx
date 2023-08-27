import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { STATIC_ROUTES } from '../constants/routes';

import SignUpForm from '../components/sign-up/SignUpForm';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const userType = searchParams.get('type') || '';

  useEffect(() => {
    const validUserTypes = ['company', 'customer'];

    if (!validUserTypes.includes(userType)) {
      navigate(STATIC_ROUTES.HOME);
    }
  }, []);

  return (
    <SignUpForm
      userType={userType}
    />
  );
}
