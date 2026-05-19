"use client";

import Link from "next/link";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  MdLocationOn,
  MdEmail,
  MdPhone,
} from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* LOGO */}
          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12 h-12 rounded-full
                  bg-cyan-500 flex items-center
                  justify-center text-2xl font-bold
                "
              >
                D
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  DocAppoint
                </h2>

                <p className="text-sm text-gray-400">
                  Smart Healthcare Platform
                </p>

              </div>

            </div>

            <p className="text-gray-400 mt-5 leading-7">
              Easily book appointments with trusted doctors
              anytime and anywhere.
            </p>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/doctors"
                  className="hover:text-cyan-400 duration-300"
                >
                  Doctors
                </Link>
              </li>

              <li>
                <Link
                  href="/appointments"
                  className="hover:text-cyan-400 duration-300"
                >
                  Appointments
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-cyan-400 duration-300"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact Info
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="flex items-center gap-3">

                <MdLocationOn className="text-cyan-400 text-2xl" />

                <span>
                  Dhanmondi, Dhaka, Bangladesh
                </span>

              </li>

              <li className="flex items-center gap-3">

                <MdPhone className="text-cyan-400 text-2xl" />

                <span>
                  +880 1234-567890
                </span>

              </li>

              <li className="flex items-center gap-3">

                <MdEmail className="text-cyan-400 text-2xl" />

                <span>
                  support@docappoint.com
                </span>

              </li>

            </ul>

          </div>

          {/* SOCIAL */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex items-center gap-4">

              <a
                href="#"
                className="
                  w-11 h-11 rounded-full
                  bg-gray-800 flex items-center
                  justify-center
                  hover:bg-cyan-500 duration-300
                "
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="
                  w-11 h-11 rounded-full
                  bg-gray-800 flex items-center
                  justify-center
                  hover:bg-cyan-500 duration-300
                "
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="
                  w-11 h-11 rounded-full
                  bg-gray-800 flex items-center
                  justify-center
                  hover:bg-cyan-500 duration-300
                "
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="
                  w-11 h-11 rounded-full
                  bg-gray-800 flex items-center
                  justify-center
                  hover:bg-cyan-500 duration-300
                "
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div
          className="
            border-t border-gray-800
            mt-14 pt-6
            text-center text-gray-500 text-sm
          "
        >
          © 2026 DocAppoint. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}