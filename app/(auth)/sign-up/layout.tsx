import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vista Safari | Sign Up',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
