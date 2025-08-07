import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
}

interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EditEmployee({ employee }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Employees', href: '/employees' },
        { title: employee.name, href: `/employees/${employee.id}` },
        { title: 'Edit', href: `/employees/${employee.id}/edit` },
    ];

    const [formData, setFormData] = useState({
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department || '',
        position: employee.position || '',
        monthly_quota: employee.monthly_quota,
        current_quota: employee.current_quota,
        is_active: employee.is_active,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                    ['monthly_quota', 'current_quota'].includes(name) ? parseInt(value) || 0 :
                    value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        router.put(`/employees/${employee.id}`, formData, {
            onError: (errors) => {
                setErrors(errors);
                setIsLoading(false);
            },
            onSuccess: () => {
                setIsLoading(false);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${employee.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ✏️ Edit Employee
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Update employee information and quota settings
                    </p>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader className="bg-blue-50">
                            <CardTitle className="text-blue-900">
                                👤 Employee Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee ID *
                                        </label>
                                        <Input
                                            type="text"
                                            name="employee_id"
                                            value={formData.employee_id}
                                            onChange={handleChange}
                                            placeholder="e.g., EMP001"
                                            className={`font-mono ${errors.employee_id ? 'border-red-500' : 'border-gray-300'}`}
                                            required
                                        />
                                        {errors.employee_id && (
                                            <p className="text-red-600 text-sm mt-1">{errors.employee_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g., John Doe"
                                            className={errors.name ? 'border-red-500' : 'border-gray-300'}
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department
                                        </label>
                                        <Input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            placeholder="e.g., IT, HR, Finance"
                                            className={errors.department ? 'border-red-500' : 'border-gray-300'}
                                        />
                                        {errors.department && (
                                            <p className="text-red-600 text-sm mt-1">{errors.department}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Position
                                        </label>
                                        <Input
                                            type="text"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            placeholder="e.g., Manager, Engineer"
                                            className={errors.position ? 'border-red-500' : 'border-gray-300'}
                                        />
                                        {errors.position && (
                                            <p className="text-red-600 text-sm mt-1">{errors.position}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Monthly Quota (Gallons) *
                                        </label>
                                        <Input
                                            type="number"
                                            name="monthly_quota"
                                            value={formData.monthly_quota}
                                            onChange={handleChange}
                                            min="1"
                                            max="100"
                                            className={errors.monthly_quota ? 'border-red-500' : 'border-gray-300'}
                                            required
                                        />
                                        {errors.monthly_quota && (
                                            <p className="text-red-600 text-sm mt-1">{errors.monthly_quota}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Quota *
                                        </label>
                                        <Input
                                            type="number"
                                            name="current_quota"
                                            value={formData.current_quota}
                                            onChange={handleChange}
                                            min="0"
                                            max={formData.monthly_quota}
                                            className={errors.current_quota ? 'border-red-500' : 'border-gray-300'}
                                            required
                                        />
                                        {errors.current_quota && (
                                            <p className="text-red-600 text-sm mt-1">{errors.current_quota}</p>
                                        )}
                                        <p className="text-sm text-gray-600 mt-1">
                                            Current remaining quota
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={formData.is_active}
                                            onChange={handleChange}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                            Employee is active
                                        </span>
                                    </label>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Inactive employees cannot access the gallon distribution system
                                    </p>
                                </div>

                                <div className="border-t pt-6">
                                    <div className="flex gap-3">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {isLoading ? '⏳ Updating...' : '💾 Update Employee'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.get(`/employees/${employee.id}`)}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}