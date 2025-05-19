import { DashboardNav } from '@/components/dashboard-nav';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b flex justify-center">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">My</span>
            <span>Profile</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <div className="flex-1 container grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-8 ml-auto mr-auto">
        <aside className="hidden md:block">
          <DashboardNav />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
