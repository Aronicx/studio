
"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getAllUsers } from '@/lib/data';
import { UserCard } from '@/components/user-card';
import type { User } from '@/lib/types';

export default function ProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const users = await getAllUsers();
      setAllUsers(users);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(user.rollNumber).includes(searchTerm)
  );

  if (loading) {
     return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center text-center space-y-4 mb-8 px-4 w-full max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Student Profiles</h1>
            <p className="text-muted-foreground">Browse and connect with your peers.</p>
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search by name or roll number..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {filteredUsers.map((user: User) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
        </div>
        
        {filteredUsers.length === 0 && (
            <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground">No users found matching your search.</p>
            </div>
        )}
    </div>
  );
}
