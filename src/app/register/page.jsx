"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { Stethoscope } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router=useRouter()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleGoogleSignin=async()=>{
  await authClient.signIn.social({
    provider: "google",
  })
}
  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit
  const onSubmit = async (e) => {
  e.preventDefault();

  const { data, error } = await authClient.signUp.email({
    email: userData.email,
    password: userData.password,
    name: userData.name,
    image: userData.photoURL,
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (data) {
    toast.success("Signup successful ");

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }
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
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleChange}
            isRequired
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
            isRequired
          />

          <Input
            label="Photo URL"
            type="url"
            name="photoURL"
            placeholder="https://..."
            value={userData.photoURL}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleChange}
            isRequired
            pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$"
            errorMessage="Password must contain at least 1 uppercase, 1 lowercase and minimum 6 characters"
          />

          <Button color="primary" type="submit" className="w-full">
            Register
          </Button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-default-300"></div>
            <span className="px-3 text-default-400 text-sm">OR</span>
            <div className="flex-1 border-t border-default-300"></div>
          </div>

          <Button onClick={handleGoogleSignin}
            variant="bordered"
            className="w-full flex items-center gap-2"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

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