export default function Custom404() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! This page doesn’t exist.</p>
            <a
                href="/"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
            >
                🔙 Go Home
            </a>
        </div>
    );
}
