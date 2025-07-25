'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useState, useEffect } from 'react';

export default function UsersPage() {
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roleform, setRoleForm] = useState({
        name: '',
        description: '',
        permissions: [],
    });
    const [permissionForm, setpermissionForm] = useState({
        name: '',
        description: '',
        category: '',
    });
    const handleRoleChange = (e) => {
        const { name, value, type, multiple, options } = e.target;

        if (type === 'select-multiple') {
            const selected = [];
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    selected.push(options[i].value);
                }
            }

            setRoleForm(prev => ({
                ...prev,
                [name]: selected,
            }));
        } else {
            setRoleForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handlePermissionChange = (e) => {
        setpermissionForm({ ...permissionForm, [e.target.name]: e.target.value });
    };
    const fetchAllRoles = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/role/all');
            if (res.ok) {
                const data = await res.json();
                setRoles(data); // Update roles state with fetched data
            } else {
                console.error('Failed to fetch roles:', res.statusText);
                alert('Failed to fetch roles');
            }
        } catch (err) {
            console.error('Error fetching roles:', err.message);
            return [];
        }
    };
    const fetchAllPermissions = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/permission/all');
            if (res.ok) {
                const data = await res.json();
                setPermissions(data); // Update permissions state with fetched data
            } else {
                console.error('Failed to fetch permissions:', res.statusText);
                alert('Failed to fetch permissions');
            }
        } catch (err) {
            console.error('Error fetching roles:', err.message);
            return [];
        }
    };
    const handleRoleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/role/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roleform),
            });
            if (res.ok) {
                const newRole = await res.json();
                setRoles([...roles, newRole.role]); // Update roles state with the new role
                setIsRoleModalOpen(false); // Close modal after submission
                setRoleForm({
                    name: '',
                    description: '',
                    permissions: [],
                }); // Reset role form
            } else {
                console.error('Failed to add role:', res.statusText);
                alert('Failed to add role');
            }
        } catch (err) {
            console.error('Error creating role:', err.message);
        }
    };
    const handlePermissionSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/permission/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(permissionForm),
            });
            if (res.ok) {
                const newPermission = await res.json();
                setPermissions([...permissions, newPermission.permission]); // Update permissions state with the new permission
                setpermissionForm({
                    name: '',
                    description: '',
                    category: '',
                }); // Reset permission form
            } else {
                console.error('Failed to add permission:', res.statusText);
                alert('Failed to add permission');
            }
            setIsPermissionModalOpen(false); // Close modal after submission
        } catch (err) {
            console.error('Error creating permission:', err.message);
        }
    };
    const handlePermissionToggle = (roleName, permissionName) => {
        setRoles(prevRoles => prevRoles.map(role => {
            if (role.name !== roleName) return role;

            const hasPermission = role.permissions.some(p => p.name === permissionName);

            let updatedPermissions;

            if (permissionName === "Full Control") {
                // If enabling Full Control: select all permissions
                if (!hasPermission) {
                    updatedPermissions = [...permissions]; // select all
                } else {
                    updatedPermissions = []; // deselect all
                }
            } else {
                // Toggle individual permission
                if (hasPermission) {
                    updatedPermissions = role.permissions.filter(p => p.name !== permissionName);
                } else {
                    const permToAdd = permissions.find(p => p.name === permissionName);
                    updatedPermissions = [...role.permissions, permToAdd];
                }

                // Optional: Auto-toggle Full Control if all are selected manually
                const allSelected = permissions.every(p =>
                    updatedPermissions.some(up => up.name === p.name)
                );
                if (allSelected && !updatedPermissions.some(p => p.name === "Full Control")) {
                    const fullControl = permissions.find(p => p.name === "Full Control");
                    updatedPermissions.push(fullControl);
                }
            }

            return { ...role, permissions: updatedPermissions };
        }));
    };
    const handleRoleDelete = async (roleId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this role?");
        if (!confirmDelete) return;
        try {
            const res = await fetch(`http://localhost:5000/api/role/${roleId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setRoles(roles.filter(role => role._id !== roleId)); // Update roles state to remove deleted role
            } else {
                console.error('Failed to delete role:', res.statusText);
                alert('Failed to delete role');
            }
        } catch (err) {
            console.error('Error deleting role:', err.message);
        }
    };
    const handlePermissionDelete = async (permissionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this permission?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/permission/${permissionId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setPermissions(permissions.filter(permission => permission._id !== permissionId)); // Update permissions state to remove deleted permission
            } else {
                console.error('Failed to delete permission:', res.statusText);
                alert('Failed to delete permission');
            }
        } catch (err) {
            console.error('Error deleting permission:', err.message);
        }
    };
    const handleSavePermissions = async () => {
        try {
            for (const role of roles) {
                const res = await fetch(`http://localhost:5000/api/role/${role._id}/update-permissions`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        permissions: role.permissions.map(p => typeof p === 'string' ? p : p.name), // use names
                    }),
                });

                if (res.ok) {
                    console.log(`✅ Permissions for role ${role.name} saved successfully!`);
                } else {
                    console.error(`Failed to save permissions for role ${role.name}: ${res.statusText}`);
                    alert(`❌ Failed to save permissions for role ${role.name}`);
                    return; // Stop further processing if any role fails
                }
            }
            alert(`✅ Permissions saved successfully!`);
        } catch (err) {
            console.error('Error saving permissions:', err.message);
            alert('❌ Failed to save permissions');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchAllRoles();
            await fetchAllPermissions();
        };

        fetchData();
    }, []);

    return (
        <AuthenticatedLayout>
            {/* Permission modal */}
            <div
                tabIndex="-1"
                aria-hidden={!isPermissionModalOpen}
                className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isPermissionModalOpen ? "" : "hidden"
                    } overflow-y-auto overflow-x-hidden`}>

                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add New Permission
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsPermissionModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handlePermissionSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* Name */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={permissionForm.name}
                                        onChange={handlePermissionChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                        placeholder="e.g. Add Book, Delete Book, Update Inventory"
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={permissionForm.description}
                                        onChange={handlePermissionChange}
                                        rows={3}
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Optional description about the permission"
                                    />
                                </div>

                                {/* Category */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Category</label>
                                    <select
                                        name="category"
                                        value={permissionForm.category}
                                        onChange={handlePermissionChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="">-- Select Category --</option>
                                        <option value="User & Role Management">User & Role Management</option>
                                        <option value="Inventory / Book Management">Inventory / Book Management</option>
                                        <option value="Acquisition & Vendor">Acquisition & Vendor</option>
                                        <option value="Serials & Subscriptions">Serials & Subscriptions</option>
                                        <option value="Circulation / Transactions">Circulation / Transactions</option>
                                        <option value="Fine & Penalty">Fine & Penalty</option>
                                        <option value="Reports & Logs">Reports & Logs</option>
                                        <option value="Catalog Search / Public Access">Catalog Search / Public Access</option>
                                        <option value="System Settings">System Settings</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Permission
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Role modal */}
            <div
                tabIndex="-1"
                aria-hidden={!isRoleModalOpen}
                className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isRoleModalOpen ? "" : "hidden"
                    } overflow-y-auto overflow-x-hidden`}>

                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add New Role
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setIsRoleModalOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleRoleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* Name */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={roleform.name}
                                        onChange={handleRoleChange}
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
                                        value={roleform.description}
                                        onChange={handleRoleChange}
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
                                        value={roleform.permissions}
                                        onChange={handleRoleChange}
                                        multiple
                                        className="w-full p-2 border rounded-md h-32"
                                    >
                                        {
                                            permissions.length === 0 ? (
                                                <option value="" disabled>No permissions available</option>
                                            ) :
                                                permissions.map((perm, index) => (
                                                    <option key={perm._id || index} value={perm.name}>
                                                        {perm.name} - {perm.description}
                                                    </option>
                                                ))
                                        }
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
                {/* Permission Listing */}
                <div className="mb-10 bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Permissions</h2>
                            <p className="text-gray-600">Manage and assign permissions to roles</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setIsPermissionModalOpen(true)}>
                            + Add New Permission
                        </button>
                    </div>
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                permissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">No Permissions available</td>
                                    </tr>
                                ) :
                                    permissions.map((permission, index) => (
                                        <tr key={permission._id || index} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-3">PER-{index + 1}</td>
                                            <td className="px-6 py-3">{permission.name}</td>
                                            <td className="px-6 py-3">{permission.description}</td>
                                            <td className="px-6 py-3">{permission.category}</td>
                                            <td className="px-6 py-3 space-x-2">
                                                <button onClick={() => handlePermissionDelete(permission._id)}>
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

                {/* Role Listing */}
                <div className="mb-10 bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Roles</h2>
                            <p className="text-gray-600">Manage user roles and their associated permissions.</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setIsRoleModalOpen(true)}>
                            + Add New Role
                        </button>
                    </div>
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roles.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">No roles available</td>
                                    </tr>
                                ) :
                                    roles.map((role, index) => (
                                        <tr key={role._id || index} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-3">RL-{index + 1}</td>
                                            <td className="px-6 py-3">{role.name}</td>
                                            <td className="px-6 py-3">{role.description}</td>
                                            <td className="px-6 py-3 space-x-2">
                                                <button onClick={() => handleRoleDelete(role._id)}>
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
                                    {permissions.map((perm, index) => (
                                        <th key={perm._id || index} className="px-6 py-3 text-center">{perm.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map((role, index) => (
                                        <tr key={role._id || index} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-3 font-semibold text-gray-700">{role.name}</td>
                                            {permissions.map((permission, index) => (
                                                <td key={permission._id || index} className="px-6 py-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={role.permissions.some(p => p.name === permission.name)}
                                                        onChange={() => handlePermissionToggle(role.name, permission.name)}
                                                        className="accent-blue-600"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <button
                            type="submit"
                            onClick={handleSavePermissions}
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
