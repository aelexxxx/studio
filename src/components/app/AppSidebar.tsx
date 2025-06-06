
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, Users, FileText, Settings, LogOut, Briefcase, ChevronDown, Folder, File, PlusCircle, UserCircle, QrCode } from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
           <Briefcase className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">ChainLink</h1>
        </Link>
        <SidebarTrigger className="hidden group-data-[collapsible=icon]:hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" legacyBehavior passHref>
              <SidebarMenuButton tooltip="Dashboard">
                <Home /> {/* This remains as a direct child */}
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="/profile" legacyBehavior passHref>
              <SidebarMenuButton tooltip="My Profile">
                <UserCircle /> {/* This remains as a direct child */}
                <span>My Profile</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
              Directory
              <Button variant="ghost" size="icon" className="h-6 w-6 group-data-[collapsible=icon]:hidden">
                <PlusCircle className="w-4 h-4" />
              </Button>
            </SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton leftIcon={<Folder />} rightIcon={<ChevronDown />} tooltip="Main Pages">
                Main Pages
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <Link href="/pages/public" legacyBehavior passHref>
                    <SidebarMenuSubButton leftIcon={<File />}>Public Page 1</SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                   <Link href="/pages/private" legacyBehavior passHref>
                    <SidebarMenuSubButton leftIcon={<File />}>Private Page A</SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton leftIcon={<Users />} tooltip="User Profiles">
                User Profiles
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Invitations">
              <QrCode /> {/* This remains as a direct child */}
              <span>Invitations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Documents">
              <FileText /> {/* This remains as a direct child */}
              <span>Documents</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings /> {/* This remains as a direct child */}
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut /> {/* This remains as a direct child */}
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

    