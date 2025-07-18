import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function SettingsPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                <p className="text-gray-600">Configure your library system settings.</p>
                {/* Add your settings content here */}
            </div>
        </AuthenticatedLayout>
    );
}