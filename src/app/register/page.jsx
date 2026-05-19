"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { Stethoscope } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-default-100 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl mt-10 mb-10 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-500 text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <Stethoscope size={34} strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Register</h2>
          <p className="text-default-500 text-sm">
            Create your DocAppoint account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            isRequired
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />

          {/* Photo URL */}
          <Input
            label="Photo URL (optional)"
            type="url"
            name="photoURL"
            placeholder="https://..."
            value={formData.photoURL}
            onChange={handleChange}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            isRequired
            pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
            errorMessage="Password must contain at least 1 uppercase, 1 lowercase and minimum 6 characters"
          />

          {/* Register Button */}
          <Button color="primary" type="submit" className="w-full">
            Register
          </Button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-default-300"></div>
            <span className="px-3 text-default-400 text-sm">OR</span>
            <div className="flex-1 border-t border-default-300"></div>
          </div>

          {/* Google Button */}
          <Button
            variant="bordered"
            className="w-full flex items-center gap-2"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>

        </form>
      </Card>
    </div>
  );
}