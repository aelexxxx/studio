import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, CalendarDays, User } from 'lucide-react';
import { SocialLinks, type SocialLinkItem } from '@/components/app/SocialLinks';

export interface UserProfileData {
  name: string;
  email: string;
  title?: string;
  phone?: string;
  birthDate?: string;
  photoUrl: string;
  socialLinks: SocialLinkItem[];
  bio?: string;
}

interface UserProfileCardProps {
  profile: UserProfileData;
}

export const UserProfileCard: FC<UserProfileCardProps> = ({ profile }) => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <Avatar className="mx-auto h-24 w-24 mb-4 ring-2 ring-primary ring-offset-background ring-offset-2">
          <AvatarImage src={profile.photoUrl} alt={profile.name} data-ai-hint="profile person" />
          <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-headline">{profile.name}</CardTitle>
        {profile.title && <CardDescription className="text-primary">{profile.title}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {profile.bio && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">About Me</h3>
            <p className="text-sm">{profile.bio}</p>
          </div>
        )}
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profile.email}</span>
            </li>
            {profile.phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile.phone}</span>
              </li>
            )}
            {profile.birthDate && (
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>Born on {profile.birthDate}</span>
              </li>
            )}
          </ul>
        </div>

        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Social Links</h3>
            <SocialLinks links={profile.socialLinks} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
