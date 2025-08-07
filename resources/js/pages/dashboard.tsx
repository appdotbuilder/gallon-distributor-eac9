import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">
                        💧 Gallon Distribution Admin
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage employees and monitor gallon distribution
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="border-blue-200">
                        <CardHeader className="bg-blue-50">
                            <CardTitle className="text-blue-900">
                                👥 Employee Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-gray-600 mb-4">
                                Add, edit, and manage employee records and their gallon quotas.
                            </p>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                                <Link href="/employees">
                                    Manage Employees
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200">
                        <CardHeader className="bg-green-50">
                            <CardTitle className="text-green-900">
                                📊 Distribution System
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-gray-600 mb-4">
                                Access the main gallon distribution interface.
                            </p>
                            <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                                <Link href="/">
                                    Go to Distribution
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                        <CardHeader className="bg-purple-50">
                            <CardTitle className="text-purple-900">
                                ⚙️ System Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-gray-600 mb-4">
                                Configure system preferences and admin settings.
                            </p>
                            <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                                <Link href="/settings">
                                    System Settings
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                                    <Link href="/employees/create">
                                        <span className="text-2xl">➕</span>
                                        <span className="text-sm">Add Employee</span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                                    <Link href="/employees">
                                        <span className="text-2xl">👁️</span>
                                        <span className="text-sm">View All Employees</span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                                    <Link href="/">
                                        <span className="text-2xl">🔍</span>
                                        <span className="text-sm">Distribution Interface</span>
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                                    <Link href="/settings">
                                        <span className="text-2xl">⚙️</span>
                                        <span className="text-sm">Settings</span>
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}