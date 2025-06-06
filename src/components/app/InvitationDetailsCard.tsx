import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface InvitationDetailsCardProps {
  inviteCode: string;
  qrCodeUrl: string; // URL to the QR code image
  inviteLinkBase?: string; // e.g., https://yourapp.com/join?code=
}

export const InvitationDetailsCard: FC<InvitationDetailsCardProps> = ({ inviteCode, qrCodeUrl, inviteLinkBase = "https://example.com/register?invite=" }) => {
  const { toast } = useToast();
  const fullInviteLink = `${inviteLinkBase}${inviteCode}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: `${type} Copied!`, description: `${text} has been copied to your clipboard.` });
    }).catch(err => {
      toast({ title: "Copy Failed", description: `Could not copy ${type}.`, variant: "destructive" });
      console.error('Failed to copy: ', err);
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <QrCode className="h-5 w-5 text-primary" />
          Invite Others
        </CardTitle>
        <CardDescription>Share your invite code or link to add new users to the Social Chain.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="p-2 border rounded-md bg-white">
            <Image 
              src={qrCodeUrl} 
              alt="Invitation QR Code" 
              width={160} 
              height={160}
              data-ai-hint="qr code" 
            />
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">Your Invite Code</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-semibold font-mono p-2 border rounded-md bg-muted flex-grow">{inviteCode}</p>
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(inviteCode, "Invite Code")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-muted-foreground">Your Invite Link</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm p-2 border rounded-md bg-muted flex-grow truncate">{fullInviteLink}</p>
                 <Button variant="outline" size="icon" onClick={() => copyToClipboard(fullInviteLink, "Invite Link")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Share2 className="mr-2 h-4 w-4" />
          Share Invitation
        </Button>
      </CardContent>
    </Card>
  );
};
