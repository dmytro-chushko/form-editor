import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendVerificationEmail(
  email: string,
  verifyUrl: string
) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `Натисніть <a href="${verifyUrl}">тут</a> щоб підтвердити email (діє 24 години).`,
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `Click <a href="${resetUrl}">here</a> to reset your password. The link will expire in 30 minutes.`,
  });
}
