
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { findUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut, Users, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/types';

export function SideNav() {
  const { loggedInUserId, logout, authLoading } = useAuth();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
        if (loggedInUserId) {
            const foundUser = await findUser(loggedInUserId);
            setUser(foundUser);
        } else {
            setUser(null);
        }
    }
    fetchUser();
  }, [loggedInUserId]);


  const navLinks = [
    { href: '/my-profile', label: 'My Profile', icon: UserIcon, requiresAuth: true },
    { href: '/profiles', label: 'Student Profiles', icon: Users, requiresAuth: false },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-background p-4">
      <div className="flex items-center space-x-2 pb-6 border-b">
        <Users className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl">Campus Connect</span>
      </div>
      
      <nav className="flex-1 mt-6 space-y-2">
        {navLinks.map((link) => {
          if (link.requiresAuth && !loggedInUserId) return null;
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} passHref>
              <Button variant={isActive ? 'secondary' : 'ghost'} className="w-full justify-start">
                <link.icon className="mr-2" /> {link.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        {authLoading ? (
          <div className="h-[52px] animate-pulse bg-muted rounded-lg"></div> 
        ) : loggedInUserId && user ? (
          <div className="flex items-center gap-2 p-2 rounded-lg border">
            <Avatar>
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">Roll No: {user.rollNumber}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut />
            </Button>
          </div>
        ) : (
          <Button asChild className="w-full">
            <Link href="/login">
              <LogIn className="mr-2" /> Login
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
