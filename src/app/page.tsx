"use client";

import { useState, useMemo } from 'react';
import { users } from '@/lib/data';
import { UserCard } from '@/components/user-card';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return users;
    }
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

      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-base"
          />
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold">No users found</h2>
          <p className="text-muted-foreground">Try adjusting your search query.</p>
        </div>
      )}
    </main>
  );
}
