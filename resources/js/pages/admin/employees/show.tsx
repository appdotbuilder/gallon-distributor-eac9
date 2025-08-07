import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    created_at: string;
    transactions: Array<{
        id: number;
        gallons_taken: number;
        remaining_quota: number;
        transaction_date: string;
        created_at: string;
    }>;
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function ShowEmployee({ employee }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Employees', href: '/employees' },
        { title: employee.name, href: `/employees/${employee.id}` },
    ];

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            router.delete(`/employees/${employee.id}`);
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`${employee.name} - Employee Details`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            👤 {employee.name}
                            <Badge 
                                variant={employee.is_active ? "default" : "secondary"}
                                className={employee.is_active 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }
                            >
                                {employee.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                        </h1>
                        <p className="text-gray-600 mt-1 font-mono">
                            Employee ID: {employee.employee_id}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href={`/employees/${employee.id}/edit`}>
                                ✏️ Edit Employee
                            </Link>
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={handleDelete}
                            className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                            🗑️ Delete Employee
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Employee Information */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="bg-blue-50">
                                <CardTitle className="text-blue-900">
                                    📋 Employee Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <span className="font-semibold text-gray-700">Name:</span>
                                    <p className="text-lg">{employee.name}</p>
                                </div>
                                
                                <div>
                                    <span className="font-semibold text-gray-700">Employee ID:</span>
                                    <p className="font-mono bg-gray-100 px-2 py-1 rounded">
                                        {employee.employee_id}
                                    </p>
                                </div>

                                {employee.department && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Department:</span>
                                        <p>{employee.department}</p>
                                    </div>
                                )}

                                {employee.position && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Position:</span>
                                        <p>{employee.position}</p>
                                    </div>
                                )}

                                <div>
                                    <span className="font-semibold text-gray-700">Status:</span>
                                    <div className="mt-1">
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
                                </div>

                                <div>
                                    <span className="font-semibold text-gray-700">Created:</span>
                                    <p className="text-sm text-gray-600">{employee.created_at}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quota Information */}
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader className="bg-green-50">
                                <CardTitle className="text-green-900">
                                    📊 Monthly Quota Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-900">
                                                {employee.monthly_quota}
                                            </div>
                                            <div className="text-sm text-blue-700">
                                                Monthly Allowance
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`text-center p-4 rounded-lg ${
                                            employee.current_quota > 3 
                                                ? 'bg-green-50' 
                                                : employee.current_quota > 0
                                                ? 'bg-yellow-50'
                                                : 'bg-red-50'
                                        }`}>
                                            <div className={`text-2xl font-bold ${
                                                employee.current_quota > 3 
                                                    ? 'text-green-900' 
                                                    : employee.current_quota > 0
                                                    ? 'text-yellow-900'
                                                    : 'text-red-900'
                                            }`}>
                                                {employee.current_quota}
                                            </div>
                                            <div className={`text-sm ${
                                                employee.current_quota > 3 
                                                    ? 'text-green-700' 
                                                    : employee.current_quota > 0
                                                    ? 'text-yellow-700'
                                                    : 'text-red-700'
                                            }`}>
                                                Remaining This Month
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Usage Progress</span>
                                        <span>
                                            {Math.round(((employee.monthly_quota - employee.current_quota) / employee.monthly_quota) * 100)}% used
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                            style={{ 
                                                width: `${((employee.monthly_quota - employee.current_quota) / employee.monthly_quota) * 100}%` 
                                            }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">
                                        Quota resets on: {employee.quota_reset_date}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader className="bg-purple-50">
                                <CardTitle className="text-purple-900">
                                    📈 Recent Transactions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {employee.transactions && employee.transactions.length > 0 ? (
                                    <div className="space-y-3">
                                        {employee.transactions.map((transaction) => (
                                            <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {transaction.gallons_taken} gallon{transaction.gallons_taken > 1 ? 's' : ''} taken
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {transaction.transaction_date} • {transaction.created_at}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">Remaining</div>
                                                    <div className="font-semibold text-blue-900">
                                                        {transaction.remaining_quota}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">📋</div>
                                        <p className="text-gray-600">No transactions recorded yet</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}