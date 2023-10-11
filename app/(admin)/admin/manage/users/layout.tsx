import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Vista Safari | Manage Users',
};

export default function ManageUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
