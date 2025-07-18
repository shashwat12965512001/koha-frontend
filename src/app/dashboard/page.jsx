import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
    return (
        <AuthenticatedLayout>
            <Dashboard />
        </AuthenticatedLayout>
    );
}
