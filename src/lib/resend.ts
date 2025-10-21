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
