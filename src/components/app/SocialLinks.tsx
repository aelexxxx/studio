import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Instagram, Twitter, Linkedin, Facebook, Spotify, Github, Youtube, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface SocialLinkItem {
  platform: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLinkItem[];
  className?: string;
}

const socialIconMap: Record<string, LucideIcon> = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  spotify: Spotify,
  github: Github,
  youtube: Youtube,
  default: LinkIcon,
};

export const SocialLinks: FC<SocialLinksProps> = ({ links, className }) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      <TooltipProvider>
        {links.map((link) => {
          const IconComponent = socialIconMap[link.platform.toLowerCase()] || socialIconMap.default;
          return (
            <Tooltip key={link.platform}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                    <IconComponent className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.platform}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};
