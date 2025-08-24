
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, LogOut, Users, Search } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { users } from '@/lib/data';
import { UserCard } from '@/components/user-card';
import type { User } from '@/lib/types';

export default function Home() {
  const { loggedInUserId, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(user.rollNumber).includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-body">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span className="font-bold sm:inline-block">Campus Connect</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {loggedInUserId ? (
                <>
                  <Link href={`/profile/${loggedInUserId}`} className="hover:text-primary transition-colors">
                    My Profile
                  </Link>
                  <Button variant="ghost" onClick={logout}>
                    <LogOut className="mr-2" /> Logout
                  </Button>
                </>
              ) : (
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="mr-2" /> Login
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Student Profiles</h1>
            <p className="text-muted-foreground">Browse and connect with your peers.</p>
            <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search by name or roll number..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {filteredUsers.map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
        {filteredUsers.length === 0 && (
            <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
        )}
      </main>
    </div>
  );
}
