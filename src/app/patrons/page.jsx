import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function PatronsPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Patrons</h1>
                <p className="text-gray-600">Manage library members and patrons.</p>
                {/* Add your patrons content here */}
            </div>
        </AuthenticatedLayout>
    );
}