import type { FC, HTMLAttributes } from 'react';
import { AppBreadcrumbs, type BreadcrumbItem } from '@/components/app/AppBreadcrumbs';
import { Button } from '@/components/ui/button';
import { UserCircle, Bell } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  breadcrumbItems: BreadcrumbItem[];
}

export const AppHeader: FC<AppHeaderProps> = ({ breadcrumbItems, className, ...props }) => {
  return (
    <header
      className={`flex items-center justify-between p-4 border-b bg-card ${className || ''}`}
      {...props}
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <AppBreadcrumbs items={breadcrumbItems} />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-5 w-5" />
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
};
