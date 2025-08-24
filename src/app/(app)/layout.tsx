
'use client';

import { SideNav } from '@/components/sidenav';
import { useAuth } from '@/context/auth-context';
import { seedDatabase } from '@/lib/data';
import { useEffect } from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  useEffect(() => {
    // Seed the database on initial load if needed
    seedDatabase();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>
  }
  
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 p-8 bg-muted/30">
        {children}
      </main>
    </div>
  );
}
