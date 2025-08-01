"use client";

import { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
    });
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:1337/api/auth/local/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error?.message || "Registration failed");
                return;
            }

            // After user is created
            const res2 = await fetch("http://localhost:1337/api/update-user-role", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    roleName: formData.role, // e.g. "Librarian"
                }),
            });

            if (!res2.ok) {
                setError(data.error?.message || "Registration failed");
                return;
            }

            alert("✅ Registered successfully!");
            router.push("/login");
        } catch (err) {
            setError("Something went wrong.");
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
            <div className="bg-white p-8 my-12 rounded shadow-md w-full max-w-md pt-0">
                <div className="flex justify-center">
                    <img width="200" src="/assets/img/logo.png" alt="logo" />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
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
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                    />
                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat password"
                    />

                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <Button type="submit">Register</Button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
