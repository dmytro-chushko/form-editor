function mapNextAuthError(err?: string | null) {
  switch (err) {
    case 'OAuthSignin':
    case 'OAuthCallback':
    case 'OAuthCreateAccount':
    case 'OAuthAccountNotLinked':
    case 'OAuthProfileParse':
    case 'OAuthSessionRequired':
      return 'Authentication with the provider failed. Please try again.';
    case 'CredentialsSignin':
      return 'Invalid email or password';
    case 'AccessDenied':
      return 'Access denied. Please check your permissions.';
    case 'SessionRequired':
      return 'Please sign in to continue.';
    case 'Configuration':
    case 'Default':
    default:
      return 'Authentication error. Please try again later.';
  }
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string | null }>;
}) {
  const err = (await searchParams).error;

  const message = mapNextAuthError(err);

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Sign in error</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <a className="mt-4 inline-block text-blue-600" href="/sign-in">
        Back to sign in
      </a>
    </main>
  );
}
