import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function MyBooksPage() {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">My Books</h1>
                <p className="text-gray-600">View your borrowed books and reading history.</p>
                {/* Add your my books content here */}
            </div>
        </AuthenticatedLayout>
    );
}