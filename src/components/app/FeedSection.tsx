import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedItem, type FeedPost } from '@/components/app/FeedItem';
import { FileText } from 'lucide-react';

interface FeedSectionProps {
  posts: FeedPost[];
}

export const FeedSection: FC<FeedSectionProps> = ({ posts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <FileText className="h-5 w-5 text-primary" />
          My Feed
        </CardTitle>
        <CardDescription>Recent blog posts and updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <FeedItem key={post.id} post={post} />)
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No posts yet. Start sharing your thoughts!</p>
        )}
      </CardContent>
    </Card>
  );
};
