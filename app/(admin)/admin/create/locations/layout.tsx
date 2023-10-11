import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Vista Safari | Create Location',
};

export default function CreateLocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
