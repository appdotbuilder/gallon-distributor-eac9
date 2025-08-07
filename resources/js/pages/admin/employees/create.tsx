import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Employees', href: '/employees' },
    { title: 'Create', href: '/employees/create' },
];

export default function CreateEmployee() {
    const [formData, setFormData] = useState({
        employee_id: '',
        name: '',
        department: '',
        position: '',
        monthly_quota: 10,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'monthly_quota' ? parseInt(value) || 0 : value
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
        
        router.post('/employees', formData, {
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
            <Head title="Add New Employee" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ➕ Add New Employee
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Create a new employee record for gallon distribution
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
                                        className={`max-w-xs ${errors.monthly_quota ? 'border-red-500' : 'border-gray-300'}`}
                                        required
                                    />
                                    {errors.monthly_quota && (
                                        <p className="text-red-600 text-sm mt-1">{errors.monthly_quota}</p>
                                    )}
                                    <p className="text-sm text-gray-600 mt-1">
                                        Default is 10 gallons per month
                                    </p>
                                </div>

                                <div className="border-t pt-6">
                                    <Alert className="border-blue-200 bg-blue-50 mb-4">
                                        <AlertDescription className="text-blue-800">
                                            💡 The new employee will start with their full monthly quota available. 
                                            The quota will automatically reset on the 1st of each month.
                                        </AlertDescription>
                                    </Alert>

                                    <div className="flex gap-3">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {isLoading ? '⏳ Creating...' : '➕ Create Employee'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.get('/employees')}
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