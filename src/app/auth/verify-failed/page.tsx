export default function VerifyFailedPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Verification failed</h1>
      <p className="mt-2 text-gray-600">
        The verification link is invalid or has expired. Please request a new
        one.
      </p>
      <a
        className="mt-4 inline-block text-blue-600"
        href="/auth/verify-request"
      >
        Request new email
      </a>
    </main>
  );
}
