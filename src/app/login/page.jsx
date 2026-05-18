"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { Stethoscope } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
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
    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-default-100 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
  <div className="bg-cyan-500 text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
    <Stethoscope size={34} strokeWidth={2.5} />
  </div>
</div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="text-default-500 text-sm">
            Welcome back to DocAppoint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />

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


          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button color="primary" type="submit" className="w-full">
            Login
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

          <p className="text-center text-sm mt-4">
            Dont have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>

        </form>
      </Card>
    </div>
  );
}