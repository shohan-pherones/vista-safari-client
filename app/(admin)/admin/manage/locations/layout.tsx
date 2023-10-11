import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Vista Safari | Manage Locations',
};

export default function ManageLocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
