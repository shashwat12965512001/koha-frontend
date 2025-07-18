import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function ReportsPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Reports</h1>
                <p className="text-gray-600">View library statistics and reports.</p>
                {/* Add your reports content here */}
            </div>
        </AuthenticatedLayout>
    );
}