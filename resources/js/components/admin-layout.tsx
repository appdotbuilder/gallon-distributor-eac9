import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppShell } from '@/components/app-shell';
import { SidebarInset } from '@/components/ui/sidebar';
import { BreadcrumbItem } from '@/types';
import React from 'react';

interface AdminLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} />
                <AppContent>{children}</AppContent>
            </SidebarInset>
        </AppShell>
    );
}