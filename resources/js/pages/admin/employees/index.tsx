import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string | null;
    position: string | null;
    monthly_quota: number;
    current_quota: number;
    is_active: boolean;
    quota_reset_date: string;
}

interface Props {
    employees: {
        data: Employee[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Employees', href: '/employees' },
];

export default function EmployeesIndex({ employees }: Props) {
    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            router.delete(`/employees/${employee.id}`, {
                onSuccess: () => {
                    // Handle success if needed
                }
            });
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Management" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            👥 Employee Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage employee records and gallon quotas
                        </p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/employees/create">
                            ➕ Add New Employee
                        </Link>
                    </Button>
                </div>

                {employees.data.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-6xl mb-4">👤</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No employees found
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Get started by adding your first employee to the system.
                            </p>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link href="/employees/create">
                                    Add Your First Employee
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {employees.data.map((employee) => (
                            <Card key={employee.id} className="border-gray-200">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {employee.name}
                                                </h3>
                                                <Badge 
                                                    variant="secondary"
                                                    className="bg-gray-100 text-gray-800 font-mono text-xs"
                                                >
                                                    {employee.employee_id}
                                                </Badge>
                                                <Badge 
                                                    variant={employee.is_active ? "default" : "secondary"}
                                                    className={employee.is_active 
                                                        ? "bg-green-100 text-green-800" 
                                                        : "bg-red-100 text-red-800"
                                                    }
                                                >
                                                    {employee.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </div>
                                            
                                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    {employee.department && (
                                                        <p><strong>Department:</strong> {employee.department}</p>
                                                    )}
                                                    {employee.position && (
                                                        <p><strong>Position:</strong> {employee.position}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p>
                                                        <strong>Monthly Quota:</strong> {employee.monthly_quota} gallons
                                                    </p>
                                                    <p>
                                                        <strong>Remaining:</strong> 
                                                        <span className={`ml-1 font-semibold ${
                                                            employee.current_quota > 3 
                                                                ? 'text-green-600' 
                                                                : employee.current_quota > 0
                                                                ? 'text-yellow-600'
                                                                : 'text-red-600'
                                                        }`}>
                                                            {employee.current_quota} gallons
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2 ml-4">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/employees/${employee.id}`}>
                                                    👁️ View
                                                </Link>
                                            </Button>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/employees/${employee.id}/edit`}>
                                                    ✏️ Edit
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleDelete(employee)}
                                                className="border-red-200 text-red-700 hover:bg-red-50"
                                            >
                                                🗑️ Delete
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Quota Usage</span>
                                            <span>
                                                {Math.round(((employee.monthly_quota - employee.current_quota) / employee.monthly_quota) * 100)}% used
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ 
                                                    width: `${((employee.monthly_quota - employee.current_quota) / employee.monthly_quota) * 100}%` 
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination would go here if needed */}
                {employees.links && employees.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex space-x-2">
                            {employees.links.map((link, index: number) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={link.active ? "bg-blue-600 hover:bg-blue-700" : ""}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}