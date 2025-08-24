
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, LogIn, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';

const NavLink = ({ href, children, active=false }: { href: string; children: React.ReactNode, active?:boolean }) => (
  <Link href={href} className={`text-sm hover:text-primary transition-colors ${active ? 'text-primary' : ''}`}>
    {children}
  </Link>
);

export default function Home() {
  const { loggedInUserId, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-body">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="bg-card/30 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-7xl mx-auto">
          <header className="flex justify-between items-center p-6 border-b border-border/20">
            <Link href="/" className="text-2xl font-bold">SEOtech.</Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink href="#" active>Home</NavLink>
              <NavLink href="#">What We Do</NavLink>
              <NavLink href="#">Services</NavLink>
              <NavLink href="#">Portfolio</NavLink>
              <NavLink href="#">Contact</NavLink>
              <NavLink href="#">Blog</NavLink>
              <NavLink href="#">FAQs</NavLink>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon"><ShoppingCart /></Button>
              <Button variant="ghost" size="icon"><Search /></Button>
              <Button>Get Started</Button>
            </div>
          </header>

          <div className="flex flex-col md:flex-row items-center p-8 md:p-12 lg:p-20">
            <div className="md:w-1/2 text-left space-y-6">
              <p className="font-light tracking-widest text-primary">SEO OPTIMISATION TEMPLATE</p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                SEO <br />
                OPTIMISATION <br />
                MAXIMISE <br />
                YOUR ONLINE <br />
                VISIBILITY
              </h1>
              <p>BOOST YOUR OWN AWESOME WEBSITE</p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-6 text-lg font-bold shadow-lg shadow-accent/30 transform hover:scale-105 transition-transform">
                Start
              </Button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 relative">
              <Image src="https://placehold.co/800x600.png" width={800} height={600} alt="SEO Optimization Illustration" className="w-full" data-ai-hint="laptop analytics" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
