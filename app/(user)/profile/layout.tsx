import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vista Safari | Profile',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
