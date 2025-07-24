'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function UsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Librarian' },
        { id: 3, name: 'Student' },
        { id: 4, name: 'Guest' },
    ]);

    const [rolePermissions, setRolePermissions] = useState({
        Admin: ['Full Control'],
        Librarian: ['Issue Books', 'Return Books', 'Edit Books'],
        Student: ['View Catalog', 'Borrow Books'],
        Guest: ['View Catalog'],
    });

    const [editRoleId, setEditRoleId] = useState(null);
    const [editRoleName, setEditRoleName] = useState('');

    const allPermissions = [
        'Full Control',
        'Issue Books',
        'Return Books',
        'Edit Books',
        'View Catalog',
        'Borrow Books',
    ];

    const handlePermissionToggle = (role, permission) => {
        setRolePermissions(prev => {
            const updated = { ...prev };
            const currentPermissions = new Set(prev[role] || []);

            if (permission === 'Full Control') {
                updated[role] = currentPermissions.has('Full Control') ? [] : [...allPermissions];
            } else {
                currentPermissions.has(permission)
                    ? currentPermissions.delete(permission)
                    : currentPermissions.add(permission);

                const others = allPermissions.filter(p => p !== 'Full Control');
                const hasAll = others.every(p => currentPermissions.has(p));

                hasAll ? currentPermissions.add('Full Control') : currentPermissions.delete('Full Control');
                updated[role] = Array.from(currentPermissions);
            }

            return updated;
        });
    };

    const [form, setForm] = useState({
        name: '',
        description: '',
        permissions: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/role/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Role added successfully!');
                console.log('Success:', data);

                setForm({
                    name: '',
                    description: '',
                    permissions: '',
                });

                setIsModalOpen(false);

                // Optional: update inventory list if needed
                setRoles(prev => [data.role, ...prev]);
            } else {
                console.error('❌ Error:', data.error);
                alert(data.error || 'Failed to add book.');
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            alert('Network error. Please try again.');
        }
    };

    const handleDelete = (id) => {
        const roleName = roles.find(r => r.id === id)?.name;
        setRoles(prev => prev.filter(r => r.id !== id));

        // Also remove permissions
        setRolePermissions(prev => {
            const updated = { ...prev };
            delete updated[roleName];
            return updated;
        });
    };

    return (
        <AuthenticatedLayout>
            {/* Main modal */}
            <div
                id="add-new-acquisition"
                tabIndex="-1"
                aria-hidden={!isModalOpen}
                className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? "" : "hidden"
                    } overflow-y-auto overflow-x-hidden`}>

                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add New Role
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* Role Name */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Role Name</label>
                                    <input
                                        type="text"
                                        name="roleName"
                                        value={form.roleName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                        placeholder="e.g. Librarian, Admin"
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Optional description about the role"
                                    />
                                </div>

                                {/* Permissions */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Permissions</label>
                                    <select
                                        name="permissions"
                                        value={form.permissions}
                                        onChange={handleChange}
                                        multiple
                                        className="w-full p-2 border rounded-md h-32"
                                    >
                                        <option value="addBook">Add Book</option>
                                        <option value="deleteBook">Delete Book</option>
                                        <option value="updateInventory">Update Inventory</option>
                                        <option value="issueBook">Issue Book</option>
                                        <option value="returnBook">Return Book</option>
                                        <option value="manageUsers">Manage Users</option>
                                        <option value="viewReports">View Reports</option>
                                    </select>
                                    <small className="text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple</small>
                                </div>
                            </div>


                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Role
                            </button>
                        </form>

                    </div>
                </div>
            </div>

            <div className="p-6">

                {/* Role Listing */}
                <div className="mb-10 bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Roles</h2>
                            <p className="text-gray-600">Manage user roles and their associated permissions.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
                            + Add New Role
                        </button>
                    </div>
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Role ID</th>
                                <th className="px-6 py-3">Role Name</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">{role.id}</td>
                                    <td className="px-6 py-3">
                                        {editRoleId === role.id ? (
                                            <input
                                                type="text"
                                                value={editRoleName}
                                                onChange={(e) => setEditRoleName(e.target.value)}
                                                className="border rounded px-2 py-1 w-full"
                                            />
                                        ) : (
                                            role.name
                                        )}
                                    </td>
                                    <td className="px-6 py-3 space-x-2">
                                        <button onClick={() => handleDelete(book._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-red-600 mx-auto hover:scale-110 transition">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m3 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h14zM10 11v6M14 11v6" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Role Permissions */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Role Permissions</h2>
                    <div className="overflow-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-6 py-3">Role</th>
                                    {allPermissions.map((perm) => (
                                        <th key={perm} className="px-6 py-3 text-center">{perm}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(rolePermissions).map(role => (
                                    <tr key={role} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3 font-semibold text-gray-700">{role}</td>
                                        {allPermissions.map(permission => (
                                            <td key={permission} className="px-6 py-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={rolePermissions[role]?.includes(permission)}
                                                    onChange={() => handlePermissionToggle(role, permission)}
                                                    className="accent-blue-600"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
