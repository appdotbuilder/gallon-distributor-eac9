import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string | null;
    position: string | null;
    monthly_quota: number;
    current_quota: number;
    quota_reset_date: string;
}

interface Props {
    employee: Employee | null;
    success: string | null;
    error: string | null;
    [key: string]: unknown;
}

export default function Welcome({ employee, success, error }: Props) {
    const [employeeId, setEmployeeId] = useState('');
    const [gallons, setGallons] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Clear form after successful transaction
    useEffect(() => {
        if (success) {
            setEmployeeId('');
            setGallons(1);
        }
    }, [success]);

    const handleLookup = () => {
        if (!employeeId.trim()) return;
        
        setIsLoading(true);
        router.post('/employee/lookup', 
            { employee_id: employeeId.trim() },
            {
                onFinish: () => setIsLoading(false),
                preserveState: false,
            }
        );
    };

    const handleTakeGallons = () => {
        if (!employee || gallons < 1) return;
        
        setIsLoading(true);
        router.post('/gallon/take',
            { 
                employee_id: employee.employee_id,
                gallons: gallons 
            },
            {
                onFinish: () => setIsLoading(false),
                preserveState: false,
            }
        );
    };

    const handleReset = () => {
        router.get('/', {}, { preserveState: false });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !employee) {
            handleLookup();
        }
    };

    return (
        <>
            <Head title="PT Tirta Investama - Gallon Distribution" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">💧</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">PT Tirta Investama</h1>
                                <p className="text-sm text-gray-600">Gallon Distribution System</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={() => window.location.href = '/login'}
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                            🔐 Admin Login
                        </Button>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {/* Welcome Section */}
                    {!employee && (
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                💧 Gallon Distribution System
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Scan your employee barcode or enter your Employee ID to check your monthly gallon quota
                            </p>
                        </div>
                    )}

                    {/* Alerts */}
                    {success && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">
                                ✅ {success}
                            </AlertDescription>
                        </Alert>
                    )}

                    {error && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">
                                ❌ {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Employee ID Input */}
                            {!employee && (
                                <Card className="border-blue-200">
                                    <CardHeader className="bg-blue-50">
                                        <CardTitle className="text-blue-900">
                                            🏷️ Enter Employee ID
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Employee ID
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={employeeId}
                                                    onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="e.g., EMP001"
                                                    className="text-lg text-center font-mono border-blue-200 focus:border-blue-500"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <Button 
                                                onClick={handleLookup}
                                                disabled={!employeeId.trim() || isLoading}
                                                className="w-full bg-blue-600 hover:bg-blue-700"
                                                size="lg"
                                            >
                                                {isLoading ? '⏳ Looking up...' : '🔍 Lookup Employee'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Employee Information */}
                            {employee && (
                                <Card className="border-blue-200">
                                    <CardHeader className="bg-blue-50">
                                        <CardTitle className="text-blue-900 flex items-center justify-between">
                                            👤 Employee Information
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={handleReset}
                                                className="border-blue-200 text-blue-700 hover:bg-blue-100"
                                            >
                                                🔄 New Lookup
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <div>
                                                <span className="font-semibold text-gray-700">ID:</span>
                                                <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                                                    {employee.employee_id}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-700">Name:</span>
                                                <span className="ml-2 text-lg font-medium">{employee.name}</span>
                                            </div>
                                            {employee.department && (
                                                <div>
                                                    <span className="font-semibold text-gray-700">Department:</span>
                                                    <span className="ml-2">{employee.department}</span>
                                                </div>
                                            )}
                                            {employee.position && (
                                                <div>
                                                    <span className="font-semibold text-gray-700">Position:</span>
                                                    <span className="ml-2">{employee.position}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Quota Information */}
                            {employee && (
                                <Card className="border-green-200">
                                    <CardHeader className="bg-green-50">
                                        <CardTitle className="text-green-900">
                                            📊 Monthly Quota ({employee.quota_reset_date})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Monthly Allowance:</span>
                                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                                    {employee.monthly_quota} gallons
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Remaining:</span>
                                                <Badge 
                                                    variant="secondary" 
                                                    className={`${
                                                        employee.current_quota > 3 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : employee.current_quota > 0
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {employee.current_quota} gallons
                                                </Badge>
                                            </div>
                                            
                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>Usage Progress</span>
                                                    <span>
                                                        {Math.round(((employee.monthly_quota - employee.current_quota) / employee.monthly_quota) * 100)}%
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
                                            </div>

                                            {/* Gallon Taking Interface */}
                                            {employee.current_quota > 0 && (
                                                <div className="border-t pt-4 space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Gallons to take:
                                                        </label>
                                                        <div className="flex space-x-2">
                                                            {[1, 2, 3, 4, 5].map((num) => (
                                                                <Button
                                                                    key={num}
                                                                    variant={gallons === num ? "default" : "outline"}
                                                                    size="sm"
                                                                    onClick={() => setGallons(num)}
                                                                    disabled={num > employee.current_quota}
                                                                    className={gallons === num ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-200 text-blue-700 hover:bg-blue-50'}
                                                                >
                                                                    {num}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={handleTakeGallons}
                                                        disabled={gallons > employee.current_quota || isLoading}
                                                        className="w-full bg-green-600 hover:bg-green-700"
                                                        size="lg"
                                                    >
                                                        {isLoading ? '⏳ Processing...' : `💧 Take ${gallons} Gallon${gallons > 1 ? 's' : ''}`}
                                                    </Button>
                                                </div>
                                            )}

                                            {employee.current_quota === 0 && (
                                                <div className="border-t pt-4">
                                                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                                                        <p className="text-red-700 font-medium">
                                                            ⚠️ Monthly quota exhausted
                                                        </p>
                                                        <p className="text-red-600 text-sm mt-1">
                                                            Quota will reset on the 1st of next month
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Instructions */}
                            {!employee && (
                                <Card className="border-gray-200 md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="text-gray-900">
                                            📋 How to Use
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">
                                                    🔍 For Manual Entry:
                                                </h4>
                                                <ol className="space-y-2 text-gray-700">
                                                    <li>1. Enter your Employee ID in the input field</li>
                                                    <li>2. Click "Lookup Employee" or press Enter</li>
                                                    <li>3. Review your quota information</li>
                                                    <li>4. Select number of gallons to take</li>
                                                    <li>5. Click "Take Gallons" to complete</li>
                                                </ol>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">
                                                    📱 For Barcode Scan:
                                                </h4>
                                                <ol className="space-y-2 text-gray-700">
                                                    <li>1. Position your employee card near the scanner</li>
                                                    <li>2. Information will appear automatically</li>
                                                    <li>3. Select gallons to take from the buttons</li>
                                                    <li>4. Confirm your selection</li>
                                                    <li>5. Transaction complete!</li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-blue-800 font-medium">
                                                💡 Monthly quota of 10 gallons resets automatically on the 1st of each month at midnight.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-12">
                    <div className="container mx-auto px-4 py-6 text-center text-gray-600">
                        <p>© 2024 PT Tirta Investama - Gallon Distribution System</p>
                    </div>
                </footer>
            </div>
        </>
    );
}