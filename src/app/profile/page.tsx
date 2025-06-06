import { UserProfileCard, type UserProfileData } from '@/components/app/UserProfileCard';
import { InterestTagManager } from '@/components/app/InterestTagManager';
import { InvitationDetailsCard } from '@/components/app/InvitationDetailsCard';
import { FeedSection } from '@/components/app/FeedSection';
import type { FeedPost } from '@/components/app/FeedItem';
import { AppHeader } from '@/components/app/AppHeader'; // Re-using for consistency if needed, or a simpler header
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/AppSidebar';
import { Separator } from '@/components/ui/separator';

const mockUserProfile: UserProfileData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  title: 'Senior Software Engineer',
  phone: '+1-234-567-8900',
  birthDate: 'October 26, 1990',
  photoUrl: 'https://placehold.co/200x200.png',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexjohnson' },
    { platform: 'Twitter', url: 'https://twitter.com/alexjdev' },
    { platform: 'Github', url: 'https://github.com/alexj' },
    { platform: 'Spotify', url: 'https://spotify.com/user/alexjmusic' },
  ],
  bio: 'Passionate developer with a love for open source, hiking, and discovering new technologies. Always eager to learn and collaborate on exciting projects. My interests include AI, web development, and data science. I also enjoy photography and writing technical articles in my spare time.',
};

const mockFeedPosts: FeedPost[] = [
  {
    id: '1',
    authorName: 'Alex Johnson',
    authorAvatarUrl: 'https://placehold.co/100x100.png',
    timestamp: '2 hours ago',
    title: 'My Journey into Quantum Computing',
    content: 'Exploring the fascinating world of quantum computing and its potential to revolutionize technology. It has been a steep learning curve, but incredibly rewarding...',
    imageUrl: 'https://placehold.co/600x300.png',
    imageAiHint: "quantum computer",
    likes: 125,
    comments: 12,
  },
  {
    id: '2',
    authorName: 'Alex Johnson',
    authorAvatarUrl: 'https://placehold.co/100x100.png',
    timestamp: '1 day ago',
    title: 'Top 5 VS Code Extensions for Productivity',
    content: 'As a developer, my editor is my temple. Here are my top 5 VS Code extensions that significantly boost my productivity and coding experience...',
    likes: 230,
    comments: 45,
  },
];

const initialInterests = ['Web Development', 'Photography', 'Travel'];

const breadcrumbItems = [{ label: 'Dashboard', href: '/' }, { label: 'My Profile' }];

export default function ProfilePage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col bg-background">
          <AppHeader breadcrumbItems={breadcrumbItems} />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              <UserProfileCard profile={mockUserProfile} />
              <Separator />
              <InterestTagManager 
                initialInterests={initialInterests} 
                initialProfileContent={mockUserProfile.bio}
              />
              <Separator />
              <InvitationDetailsCard 
                inviteCode="CHAINLINK123" 
                qrCodeUrl="https://placehold.co/160x160.png?text=QR+Code" 
              />
              <Separator />
              <FeedSection posts={mockFeedPosts} />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
