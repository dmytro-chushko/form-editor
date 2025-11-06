'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl: '/' });
  }

  return (
    <form onSubmit={submit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign in</button>
      <hr />
      <button type="button" onClick={() => signIn('google')}>
        Sign in with Google
      </button>
      <button type="button" onClick={() => signIn('github')}>
        Sign in with GitHub
      </button>
    </form>
  );
}
