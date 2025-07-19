'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState } from 'react';

export default function UsersPage() {
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

    const handleDeleteRole = (id) => {
        const roleName = roles.find(r => r.id === id)?.name;
        setRoles(prev => prev.filter(r => r.id !== id));

        // Also remove permissions
        setRolePermissions(prev => {
            const updated = { ...prev };
            delete updated[roleName];
            return updated;
        });
    };

    const handleEditClick = (role) => {
        setEditRoleId(role.id);
        setEditRoleName(role.name);
    };

    const handleEditSave = () => {
        const updatedRoles = roles.map(role =>
            role.id === editRoleId ? { ...role, name: editRoleName } : role
        );

        const oldName = roles.find(r => r.id === editRoleId)?.name;

        // Rename role in permission map
        setRolePermissions(prev => {
            const updated = { ...prev };
            updated[editRoleName] = updated[oldName] || [];
            delete updated[oldName];
            return updated;
        });

        setRoles(updatedRoles);
        setEditRoleId(null);
        setEditRoleName('');
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">

                {/* Role Listing */}
                <div className="mb-10 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Roles</h2>
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
                                        {editRoleId === role.id ? (
                                            <button
                                                onClick={handleEditSave}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(role)}
                                                className="text-gray-700 hover:underline text-sm"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteRole(role.id)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Delete
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
        </AuthenticatedLayout>
    );
}
