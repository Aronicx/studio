
"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { loggedInUserId, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (loggedInUserId) {
        router.replace('/my-profile');
      } else {
        router.replace('/profiles');
      }
    }
  }, [loggedInUserId, loading, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}
