'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Tag, X } from 'lucide-react';
import { suggestInterestTags, type SuggestInterestTagsInput } from '@/ai/flows/suggest-interest-tags';
import { useToast } from "@/hooks/use-toast";

interface InterestTagManagerProps {
  initialInterests?: string[];
  initialProfileContent?: string;
}

export const InterestTagManager: FC<InterestTagManagerProps> = ({ initialInterests = [], initialProfileContent = '' }) => {
  const [profileContent, setProfileContent] = useState(initialProfileContent);
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestTags = async () => {
    if (!profileContent.trim()) {
      toast({
        title: "Profile content needed",
        description: "Please provide some information about your interests or bio to get suggestions.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSuggestedTags([]);
    try {
      const input: SuggestInterestTagsInput = { profileContent };
      const result = await suggestInterestTags(input);
      setSuggestedTags(result.suggestedTags.filter(tag => !interests.includes(tag)));
      if (result.suggestedTags.length === 0) {
        toast({ title: "No new suggestions", description: "We couldn't find any new tags based on your input." });
      }
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast({
        title: "Error",
        description: "Failed to fetch tag suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addInterest = (tag: string) => {
    if (!interests.includes(tag)) {
      setInterests([...interests, tag]);
      setSuggestedTags(suggestedTags.filter(sTag => sTag !== tag));
    }
  };

  const removeInterest = (tagToRemove: string) => {
    setInterests(interests.filter(tag => tag !== tagToRemove));
  };
  
  // Effect to re-populate suggestions if an interest is removed that was previously suggested
  useEffect(() => {
    // This is a simplified way; ideally, you'd track original suggestions
    // For now, if a removed tag was in the initial AI suggestions pool (not implemented here),
    // you might want to add it back to suggestedTags.
    // Or, simply keep suggestedTags as they are unless a new AI suggestion is triggered.
  }, [interests]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Tag className="h-5 w-5 text-primary" />
          Interests & Hobbies
        </CardTitle>
        <CardDescription>
          Add tags that represent your interests. You can also get AI-powered suggestions based on your profile description.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="profileContent" className="block text-sm font-medium mb-1">
            Tell us about yourself (optional, for AI suggestions)
          </label>
          <Textarea
            id="profileContent"
            placeholder="E.g., I love hiking, coding in Python, and exploring new cafes..."
            value={profileContent}
            onChange={(e) => setProfileContent(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSuggestTags} disabled={isLoading} className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Suggest Tags
          </Button>
        </div>

        {suggestedTags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Suggested Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  onClick={() => addInterest(tag)}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-2">Your Interests:</h4>
          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <Badge key={tag} variant="default" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeInterest(tag)} aria-label={`Remove ${tag}`} className="ml-1 opacity-70 hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No interests added yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
