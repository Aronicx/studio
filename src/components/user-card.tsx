import Link from 'next/link';
import Image from 'next/image';
import type { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/profile/${user.id}`} className="block transition-all hover:scale-105 hover:shadow-lg rounded-lg">
      <Card className="h-full overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={user.profilePicture}
              alt={user.name}
              fill
              className="object-cover"
              data-ai-hint="profile picture"
            />
          </div>
          <div className="p-4">
            <CardTitle className="text-lg truncate">{user.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              Roll No: {user.rollNumber}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {user.dailyThought}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
