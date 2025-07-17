"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Save token (optionally to localStorage/cookies)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("✅ Logged in successfully!");
            router.push("/");
        } catch (err) {
            setError("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="flex justify-center">
                    <img width="200" src="/assets/img/logo.jpg" alt="logo" />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />

                    {error && <p className="text-red-500 mb-2">{error}</p>}

                    <Button type="submit">Login</Button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
