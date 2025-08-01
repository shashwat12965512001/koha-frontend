"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { set } from "date-fns";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "", role: "" });
    const [error, setError] = useState("");
    const [roles, setRoles] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const getRoleByEmail = async (email) => {
        const res = await fetch(`http://localhost:1337/api/user-role?email=${email}`);
        const data = await res.json();

        if (!res.ok) {
            set(data.message || "Could not fetch role");
        }

        return data.role; // Example: "Librarian"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:1337/api/auth/local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error?.message || "Login failed");
                return;
            }

            const userRole = await getRoleByEmail(formData.email);
            if (userRole) {
                // Save Strapi JWT + user info
                localStorage.setItem("token", data.jwt);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("✅ Logged in successfully!");

                switch (userRole) {
                    case "Admin":
                        break;
                    case "Librarian":
                        break;
                    case "Acquisition Manager":
                        break;
                    case "Inventory Manager":
                        break;
                    case "Circulation Staff":
                        break;
                    case "Finance Officer":
                        break;
                    case "Student":
                        break;
                }
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
        }
    };

    const fetchRoles = async () => {
        const res = await fetch("http://localhost:1337/api/fetch-roles");
        const result = await res.json();
        setRoles(result);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md pt-0">
                <div className="flex justify-center">
                    <img width="200" src="/assets/img/logo.png" alt="logo" />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                        placeholder="you@example.com"
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={true}
                        placeholder="Enter your password"
                    />

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select onChange={handleChange} name="role" id="role" className="w-full p-2 border border-gray-300 rounded" required>
                            <option value="" defaultValue>Select your role</option>
                            {
                                roles.length > 0 && roles.map((role, index) => (
                                    (role.name !== "Authenticated" && role.name !== "Public") && (
                                        <option key={index} value={role.name}>{role.name}</option>
                                    )
                                ))
                            }
                        </select>
                    </div>

                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <Button type="submit">Login</Button>
                </form>
            </div >
        </div >
    );
};

export default LoginPage;
