import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Vista Safari | Manage Bookings',
};

export default function ManageBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
