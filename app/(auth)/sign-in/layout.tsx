import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vista Safari | Sign In',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
