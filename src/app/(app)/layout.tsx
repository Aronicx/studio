
import { SideNav } from '@/components/sidenav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 p-8 bg-muted/30">
        {children}
      </main>
    </div>
  );
}
