import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function ReservationsPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Reservations</h1>
                <p className="text-gray-600">Manage your book reservations.</p>
                {/* Add your reservations content here */}
            </div>
        </AuthenticatedLayout>
    );
}