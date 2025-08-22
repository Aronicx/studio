"use client";

import { useState, useMemo } from 'react';
import { users } from '@/lib/data';
import { UserCard } from '@/components/user-card';
import { Input } from '@/components/ui/input';
import { Search, Users, Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return users;
    }
    // Since there's only one user template, we allow searching to find it if needed.
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(user.rollNumber).includes(searchQuery)
    );
  }, [searchQuery]);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-2 font-headline">Campus Connect</h1>
        <p className="text-lg text-muted-foreground">Find and connect with your peers.</p>
      </header>

      {users.length > 0 ? (
        <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
            <p className="text-muted-foreground mb-4">
              To get started, click the card below to create and customize your profile.
            </p>
        </div>
      ): null}


      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
          <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold">No users yet</h2>
          <p className="text-muted-foreground">Be the first one to join!</p>
          {/* This part may not be visible if the initial user is always present */}
        </div>
      )}
    </main>
  );
}
