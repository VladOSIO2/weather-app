'use client';

import React, { useState } from 'react';
import WtButton from '@/components/WtButton/WtButton';
import WtInput from '@/components/WtInput/WtInput';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/user/user.slice';

const WtSignUpForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<string[] | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const username = formData.get('username');

    const errors: string[] = [];
    if (!username) errors.push('Username is required');
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        <h1 className="text-2xl font-bold">Sign up</h1>
        <WtInput id="email" label="Email" type="email" name="email" />
        <WtInput id="username" label="Username" type="text" name="username" />
        <WtInput
          id="password"
          label="Password"
          type="password"
          name="password"
        />
        <WtInput
          id="confirmPassword"
          label="Confirm password"
          type="password"
          name="confirmPassword"
        />
        {renderErrors}
        <WtButton type="submit" className="mt-4">
          Sign up
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
