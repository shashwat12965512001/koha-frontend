'use client';

import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { useEffect, useState } from 'react';

export default function PatronsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patrons, setPatrons] = useState([]);

    const [form, setForm] = useState({
        fullName: '',
        cardNumber: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        address: '',
        category: '',
        department: '',
        registrationDate: '',
        expiryDate: '',
        username: '',
        password: '',
        notes: '',
        status: 'Active'
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/patrons/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Patron added successfully!');
                console.log('Success:', data);

                setIsModalOpen(false);

                setForm({
                    fullName: '',
                    cardNumber: '',
                    dob: '',
                    gender: '',
                    email: '',
                    phone: '',
                    address: '',
                    category: '',
                    department: '',
                    registrationDate: '',
                    expiryDate: '',
                    username: '',
                    password: '',
                    notes: ''
                });

                // Optional: Update patron list in UI if needed
                setPatrons(prev => [data.patron, ...prev]);
            } else {
                console.error('❌ Error:', data.error);
                alert(data.error || 'Failed to add patron');
            }
        } catch (error) {
            console.error('❌ Network error:', error);
            alert('Network error. Please try again.');
        }
    };

    const fetchAllPatrons = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/patrons/all');
            const data = await res.json();
            if (res.ok) {
                setPatrons(data); // assuming you have a useState for patrons
            } else {
                alert(data.error || 'Failed to fetch patrons');
            }
        } catch (err) {
            console.error('Error:', err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this patron?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/patrons/delete/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Patron deleted successfully!');
                // Optionally remove from UI if you're storing patrons in state
                setPatrons(prev => prev.filter(patron => patron._id !== id));
            } else {
                console.error('❌ Failed to delete:', data.error);
                alert('Failed to delete patron');
            }
        } catch (err) {
            console.error('❌ Error deleting patron:', err.message);
            alert('Network error. Try again later.');
        }
    };

    const handleBlock = async (id) => {
        if (!window.confirm('Are you sure you want to block this patron?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/patrons/block/${id}`, {
                method: 'PATCH',
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Patron has been blocked!');
                // Optional: update the local state if you have `setPatrons`
                setPatrons(prev =>
                    prev.map(patron =>
                        patron._id === id ? { ...patron, status: 'Blocked' } : patron
                    )
                );
            } else {
                console.error('❌ Error:', data.error);
                alert('Failed to block patron');
            }
        } catch (err) {
            console.error('❌ Network error:', err.message);
            alert('Network error. Please try again later.');
        }
    };

    const handleUnblock = async (id) => {
        if (!window.confirm('Are you sure you want to unblock this patron?')) return;

        try {
            const response = await fetch(`http://localhost:5000/api/patrons/unblock/${id}`, {
                method: 'PATCH',
            });

            const data = await response.json();

            if (response.ok) {
                alert('✅ Patron has been unblocked!');
                // Optional: update local state
                setPatrons(prev =>
                    prev.map(patron =>
                        patron._id === id ? { ...patron, status: 'Active' } : patron
                    )
                );
            } else {
                console.error('❌ Error:', data.error);
                alert('Failed to unblock patron');
            }
        } catch (err) {
            console.error('❌ Network error:', err.message);
            alert('Network error. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAllPatrons();
    }, []);

    return (
        <AuthenticatedLayout>
            {/* Main modal */}
            <div
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
                                Add New Patron
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
                                {/* Full Name */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Full Name</label>
                                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required className="w-full p-2 border rounded-md" placeholder="e.g. John Doe" />
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Library Card Number</label>
                                    <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} required className="w-full p-2 border rounded-md" placeholder="e.g. PATRON001" />
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                                    <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Gender</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded-md" required>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Phone Number</label>
                                    <input type="number" name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Patron Status */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Account Status</label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>

                                {/* Address */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Address</label>
                                    <textarea name="address" value={form.address} onChange={handleChange} rows={2} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Patron Category */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Patron Category</label>
                                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded-md">
                                        <option value="">Select</option>
                                        <option value="Student">Student</option>
                                        <option value="Faculty">Faculty</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Guest">Guest</option>
                                    </select>
                                </div>

                                {/* Institution/Department */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Department / Institution</label>
                                    <input type="text" name="department" value={form.department} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Registration Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Registration Date</label>
                                    <input type="date" name="registrationDate" value={form.registrationDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Expiry Date */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Membership Expiry Date</label>
                                    <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Username</label>
                                    <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full p-2 border rounded-md" autoComplete="username" />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Password</label>
                                    <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full p-2 border rounded-md" autoComplete="new-password" />

                                </div>

                                {/* Notes */}
                                <div className="col-span-2">
                                    <label className="block mb-1 text-sm font-medium">Additional Notes</label>
                                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full p-2 border rounded-md" />
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Patron
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Patrons</h1>
                <p className="text-gray-600 mb-6">Manage library members and patrons.</p>

                <div className="flex justify-end items-center mb-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
                        + Add User
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SRN</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {patrons.map((patron, index) => (
                                <tr key={patron._id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-800"> PAT-{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{patron.cardNumber}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{patron.fullName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{patron.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{patron.category}</td>
                                    <td className={`px-6 py-4 text-sm ${patron.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                        {patron.status}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {patron.status === 'Active' ? (
                                            <button onClick={() => handleBlock(patron._id)} className="text-red-600 hover:underline text-sm cursor-pointer">
                                                <svg height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-6 h-8 text-red-600 mx-auto hover:scale-110 transition">
                                                    <circle cx="50" cy="50" r="45" stroke="red" strokeWidth="10" fill="none" />
                                                    <line x1="18" y1="75" x2="82" y2="25" stroke="red" strokeWidth="10"></line>
                                                </svg>
                                            </button>
                                        ) : (
                                            <button onClick={() => handleUnblock(patron._id)} className="text-red-600 hover:underline text-sm cursor-pointer">
                                                <svg height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600 mx-auto hover:scale-110 transition">
                                                    <circle cx="50" cy="50" r="45" stroke="green" strokeWidth="10" fill="none" />
                                                    <polyline points="30,55 45,70 70,35" fill="none" stroke="green" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}
                                        <button className="cursor-pointer" onClick={() => handleDelete(patron._id)}>
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
            </div>
        </AuthenticatedLayout>
    );
}
