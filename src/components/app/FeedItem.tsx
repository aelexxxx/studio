import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FeedPost {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  timestamp: string; // e.g., "2 hours ago" or a formatted date
  title?: string;
  content: string;
  imageUrl?: string;
  imageAiHint?: string;
  likes: number;
  comments: number;
}

interface FeedItemProps {
  post: FeedPost;
}

export const FeedItem: FC<FeedItemProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden">
      {post.imageUrl && (
        <div className="aspect-video relative w-full overflow-hidden">
          <Image 
            src={post.imageUrl} 
            alt={post.title || "Feed image"} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={post.imageAiHint || "article illustration"}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Avatar>
            <AvatarImage src={post.authorAvatarUrl} alt={post.authorName} data-ai-hint="person avatar" />
            <AvatarFallback>{post.authorName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{post.authorName}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        {post.title && <CardTitle className="text-xl font-headline">{post.title}</CardTitle>}
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="flex gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
            <ThumbsUp className="h-4 w-4" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-1.5" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};
