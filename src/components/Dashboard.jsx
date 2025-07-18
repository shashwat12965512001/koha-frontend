'use client';

const Dashboard = () => {
    const stats = [
        { title: 'Total Books', value: '12,458', icon: '📚', color: 'bg-blue-500' },
        { title: 'Active Members', value: '3,247', icon: '👥', color: 'bg-green-500' },
        { title: 'Books Issued', value: '892', icon: '📖', color: 'bg-yellow-500' },
        { title: 'Overdue Books', value: '23', icon: '⚠️', color: 'bg-red-500' }
    ];

    const recentActivity = [
        { action: 'Book Issued', book: 'Introduction to Algorithms', user: 'John Doe', time: '2 hours ago' },
        { action: 'Book Returned', book: 'Clean Code', user: 'Jane Smith', time: '3 hours ago' },
        { action: 'New Member', book: 'Registration', user: 'Mike Johnson', time: '5 hours ago' },
        { action: 'Book Reserved', book: 'Design Patterns', user: 'Sarah Wilson', time: '6 hours ago' }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening at the library.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-full text-white text-xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-gray-900">{activity.action}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-700">{activity.book}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>{activity.user}</span>
                                        <span>•</span>
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium">
                            Issue New Book
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium">
                            Return Book
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium">
                            Add New Member
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Database</span>
                            <span className="text-green-600 font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Backup</span>
                            <span className="text-green-600 font-medium">Updated</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Server</span>
                            <span className="text-green-600 font-medium">Healthy</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                    <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-3">
                            <p className="font-medium text-gray-900">Book Fair</p>
                            <p className="text-sm text-gray-600">March 15, 2025</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-3">
                            <p className="font-medium text-gray-900">Reading Workshop</p>
                            <p className="text-sm text-gray-600">March 20, 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;