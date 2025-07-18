import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function CatalogPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Catalog</h1>
                <p className="text-gray-600">Browse and search through our book collection.</p>
                {/* Add your catalog content here */}
            </div>
        </AuthenticatedLayout>
    );
}