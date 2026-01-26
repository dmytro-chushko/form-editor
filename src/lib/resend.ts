import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    throw new Error('RESEND_API_KEY environment variable is required');
  }

  return new Resend(key);
}

export default async function sendVerificationEmail(
  email: string,
  verifyUrl: string
) {
  const resend = getResend();
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `Натисніть <a href="${verifyUrl}">тут</a> щоб підтвердити email (діє 24 години).`,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const resend = getResend();
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `Click <a href="${resetUrl}">here</a> to reset your password. The link will expire in 30 minutes.`,
  });
}

export async function sendSharedFormLink(
  email: string,
  sharedFormLink: string
) {
  const resend = getResend();
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Submit the form',
    html: `Click <a href="${sharedFormLink}">here</a> to fill and submit form.`,
  });
}
