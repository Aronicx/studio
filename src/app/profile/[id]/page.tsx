

"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { findUser, updateUser } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/profile-form';
import { Mail, Phone, Instagram, MessageSquare, Pencil, User as UserIcon, Link as LinkIcon, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { SideNav } from '@/components/sidenav';

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/><path d="M22 10v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h3.2c.2-1.3 1-2.4 2-3 .5-1.1 1.7-2 3.8-2 2.1 0 3.3.9 3.8 2 1 .6 1.8 1.7 2 3H20c1.1 0 2 .9 2 2z"/></svg>
);


const ContactItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="text-sm truncate">{value}</span>
    </div>
  );
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { loggedInUserId } = useAuth();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (params.id) {
      const foundUser = findUser(String(params.id));
      setUser(foundUser ? {...foundUser} : null);
    }
  }, [params.id]);
  
  const isOwnProfile = loggedInUserId === user?.id;

  const handleSave = (updatedUserData: User) => {
    updateUser(updatedUserData);
    setUser(updatedUserData);
    setIsEditing(false);
  };

  if (user === undefined) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>;
  }

  if (user === null) {
    return (
        <div className="flex">
            <SideNav />
            <main className="flex-1 flex flex-col justify-center items-center text-center p-4">
                <UserIcon className="h-24 w-24 text-muted-foreground mb-4" />
                <h1 className="text-4xl font-bold">User Not Found</h1>
                <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
                <Button asChild className="mt-6">
                    <Link href="/profiles">Back to Profiles</Link>
                </Button>
            </main>
        </div>
    );
  }

  return (
    <div className="flex">
        <SideNav />
        <main className="flex-1 p-8 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              {isEditing && isOwnProfile ? (
                <ProfileForm user={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
              ) : (
                <div className="space-y-8">
                  <Card className="overflow-hidden">
                    <div className="relative h-48 md:h-64 bg-muted">
                        <Image src={user.profilePicture} alt={user.name} layout="fill" objectFit="cover" data-ai-hint="profile picture" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                         <div className="absolute bottom-4 left-4 md:bottom-6 md-left-6">
                            <h1 className="text-3xl md:text-5xl font-bold text-white font-headline">{user.name}</h1>
                            <Badge variant="secondary" className="mt-2 text-base">Roll No: {user.rollNumber}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                             {isOwnProfile && (
                               <Button
                                   variant="secondary"
                                   onClick={() => setIsEditing(true)}
                               >
                                   <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                               </Button>
                             )}
                        </div>
                    </div>
                    
                    <CardContent className="p-6">
                         <p className="text-muted-foreground">College: {user.college}</p>
                    </CardContent>
                  </Card>
        
                  <Card>
                    <CardHeader>
                        <CardTitle>Daily Thought</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="italic text-muted-foreground">"{user.dailyThought || 'No thought shared today.'}"</p>
                    </CardContent>
                  </Card>
        
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ContactItem icon={Phone} label="Phone" value={user.contact.phone} />
                        <ContactItem icon={Mail} label="Gmail" value={user.contact.gmail} />
                        <ContactItem icon={Instagram} label="Instagram" value={user.contact.instagram} />
                        <ContactItem icon={SnapchatIcon} label="Snapchat" value={user.contact.snapchat} />
                        <ContactItem icon={MessageSquare} label="Discord" value={user.contact.discord} />
                        <ContactItem icon={LinkIcon} label="Other" value={user.contact.other} />
                      </CardContent>
                    </Card>
        
                    <Card>
                      <CardHeader>
                         <CardTitle className="flex items-center gap-2"><Gamepad2 className="h-6 w-6" /> Hobbies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {user.hobbies.length > 0 ? user.hobbies.map(hobby => (
                                <Badge key={hobby} variant="outline">{hobby}</Badge>
                            )) : <p className="text-sm text-muted-foreground">No hobbies listed.</p>}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
        </main>
    </div>
  );
}
