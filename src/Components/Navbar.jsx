"use client";

import Link from "next/link";
import { Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Appointments", href: "/appointments" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
  };

  return (
    <nav className="w-full border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-cyan-500 text-white p-2 rounded-xl shadow-md group-hover:scale-105 transition">
              <Stethoscope size={22} />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              DocAppoint
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 font-medium hover:text-cyan-600 transition relative group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Avatar src={user?.image} name={user?.name} />
                <span className="text-gray-700 font-medium">
                  {user?.name}
                </span>

                <Button
                 variant="danger"
                  radius="md"
                  onPress={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-cyan-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="text-gray-700 hover:text-cyan-600 font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-5 border-t">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-cyan-600 font-medium"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.image} name={user.name} />
                    <span className="text-gray-700 font-medium">
                      {user.name}
                    </span>
                  </div>

                  <Button
                   variant="danger"
                    
                    fullWidth
                    onPress={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-cyan-500 text-white px-4 py-2 rounded-xl text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}