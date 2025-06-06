import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/AppSidebar';
import { AppHeader } from '@/components/app/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText } from 'lucide-react';

const breadcrumbItems = [{ label: 'Dashboard', href: '/' }];

interface DirectoryItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
  link: string;
  dataAiHint?: string;
}

function DirectoryItemCard({ title, description, icon, imageUrl, link, dataAiHint }: DirectoryItemProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <div className="p-2 bg-muted rounded-md">{icon}</div>
        <div className="flex-1">
          <CardTitle className="text-lg font-headline">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md aspect-video relative">
            <Image 
              src={imageUrl} 
              alt={title} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint={dataAiHint}
            />
          </div>
        )}
        <Button variant="outline" className="w-full" asChild>
          <a href={link}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DirectoryPage() {
  const directoryItems: DirectoryItemProps[] = [
    {
      title: 'User Profiles',
      description: 'Browse and manage user profiles within the directory.',
      icon: <Users className="h-6 w-6 text-primary" />,
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'team collaboration',
      link: '/users',
    },
    {
      title: 'Public Documents',
      description: 'Access publicly shared documents and resources.',
      icon: <FileText className="h-6 w-6 text-primary" />,
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'files documents',
      link: '/documents/public',
    },
    {
      title: 'Company Handbook',
      description: 'Official guidelines and information for all members.',
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: '/handbook',
    },
    {
      title: 'Project Boards',
      description: 'Collaborate on projects and track progress.',
      icon: <Users className="h-6 w-6 text-primary" />,
      imageUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'kanban board',
      link: '/projects',
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col bg-background">
          <AppHeader breadcrumbItems={breadcrumbItems} />
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-headline font-semibold">Welcome to ChainLink Directory</h1>
              <p className="text-muted-foreground">Navigate through user pages, documents, and resources.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {directoryItems.map((item, index) => (
                <DirectoryItemCard key={index} {...item} />
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
