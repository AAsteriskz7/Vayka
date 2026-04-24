import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Check Your Email',
  description: 'Please verify your email address to continue.',
}

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-surface py-16">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="font-headline italic text-3xl font-bold text-primary">Vayka</Link>

        <div className="mt-10 bg-surface-container-lowest rounded-3xl p-10 shadow-sm border border-surface-variant/20">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              mark_email_unread
            </span>
          </div>

          <h1 className="font-headline text-2xl font-bold text-on-surface mb-3">
            Check your email
          </h1>
          <p className="text-secondary text-sm leading-relaxed mb-2">
            We sent a confirmation link to your email address. Click the link to activate your account.
          </p>
          <p className="text-outline text-xs mb-8">
            Didn&apos;t receive it? Check your spam folder or wait a few minutes.
          </p>

          <div className="pt-6 border-t border-surface-variant/30">
            <p className="text-sm text-secondary">
              Already confirmed?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
