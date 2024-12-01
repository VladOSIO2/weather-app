'use client';

import React, { useState } from 'react';
import WtButton from '@/components/WtButton/WtButton';
import WtInput from '@/components/WtInput/WtInput';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/user/user.slice';
import {
  AUTH_SIGN_UP_BUTTON_TEXT,
  AUTH_SIGN_UP_FORM_CONFIRM_PASSWORD_ID,
  AUTH_SIGN_UP_FORM_CONFIRM_PASSWORD_LABEL,
  AUTH_SIGN_UP_FORM_EMAIL_ID,
  AUTH_SIGN_UP_FORM_EMAIL_LABEL,
  AUTH_SIGN_UP_FORM_PASSWORD_MATCH_ERR_MSG,
  AUTH_SIGN_UP_FORM_PASSWORD_ID,
  AUTH_SIGN_UP_FORM_PASSWORD_LABEL,
  AUTH_SIGN_UP_FORM_TITLE,
  AUTH_SIGN_UP_FORM_USERNAME_ID,
  AUTH_SIGN_UP_FORM_USERNAME_LABEL,
  AUTH_SIGN_UP_FORM_EMAIL_REQ_ERR_MSG,
  AUTH_SIGN_UP_FORM_PASSWORD_REQ_ERR_MSG,
  AUTH_SIGN_UP_FORM_USERNAME_REQ_ERR_MSG,
  AUTH_SIGN_UP_ENDPOINT,
} from '../auth.constants';

const WtSignUpForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();

  // TODO: Handle request in saga
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get(AUTH_SIGN_UP_FORM_EMAIL_ID);
    const password = formData.get(AUTH_SIGN_UP_FORM_PASSWORD_ID);
    const confirmPassword = formData.get(AUTH_SIGN_UP_FORM_CONFIRM_PASSWORD_ID);
    const username = formData.get(AUTH_SIGN_UP_FORM_USERNAME_ID);

    const errors: string[] = [];
    if (!username) errors.push(AUTH_SIGN_UP_FORM_USERNAME_REQ_ERR_MSG);
    if (!email) errors.push(AUTH_SIGN_UP_FORM_EMAIL_REQ_ERR_MSG);
    if (!password) errors.push(AUTH_SIGN_UP_FORM_PASSWORD_REQ_ERR_MSG);
    if (password !== confirmPassword) {
      errors.push(AUTH_SIGN_UP_FORM_PASSWORD_MATCH_ERR_MSG);
    }

    const response = await fetch(AUTH_SIGN_UP_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    });

    const responseData = await response.json();

    if (response.ok) {
      router.push('/');
      dispatch(setUser(responseData));
    } else {
      errors.push(
        responseData.message ?? 'Something went wrong, please try again later',
      );
    }

    setErrors(errors.length > 0 ? errors : null);
  };

  const renderErrors = errors ? (
    <div className="flex flex-col gap-1">
      {errors.map((error) => (
        <p key={error} className="text-red-500">
          {error}
        </p>
      ))}
    </div>
  ) : null;

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="m-4 mt-16 flex w-full max-w-sm flex-col gap-4 rounded-xl border-2 border-blue-300 px-4 py-4"
      >
        <h1 className="text-2xl font-bold">{AUTH_SIGN_UP_FORM_TITLE}</h1>
        <WtInput
          id={AUTH_SIGN_UP_FORM_EMAIL_ID}
          label={AUTH_SIGN_UP_FORM_EMAIL_LABEL}
          type="email"
          name={AUTH_SIGN_UP_FORM_EMAIL_ID}
        />
        <WtInput
          id={AUTH_SIGN_UP_FORM_USERNAME_ID}
          label={AUTH_SIGN_UP_FORM_USERNAME_LABEL}
          type="text"
          name={AUTH_SIGN_UP_FORM_USERNAME_ID}
        />
        <WtInput
          id={AUTH_SIGN_UP_FORM_PASSWORD_ID}
          label={AUTH_SIGN_UP_FORM_PASSWORD_LABEL}
          type="password"
          name={AUTH_SIGN_UP_FORM_PASSWORD_ID}
        />
        <WtInput
          id={AUTH_SIGN_UP_FORM_CONFIRM_PASSWORD_ID}
          label={AUTH_SIGN_UP_FORM_CONFIRM_PASSWORD_LABEL}
          type="password"
          name={AUTH_SIGN_UP_FORM_CONFIRM_PASSWORD_ID}
        />
        {renderErrors}
        <WtButton type="submit" className="mt-4">
          {AUTH_SIGN_UP_BUTTON_TEXT}
        </WtButton>
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default WtSignUpForm;
