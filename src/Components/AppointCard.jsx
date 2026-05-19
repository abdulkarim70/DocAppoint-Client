"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, Button } from "@heroui/react";

import {
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

import { GiHospitalCross } from "react-icons/gi";
import Link from "next/link";

const AppointCard = ({ doctor }) => {
    const {_id}=doctor
  const router = useRouter();

  if (!doctor) return null;

 

  return (
    <Card
      className="
        w-full h-full flex flex-col
        rounded-3xl overflow-hidden bg-white
        shadow-md border border-gray-200
        hover:-translate-y-2 hover:shadow-2xl
        duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-64 w-full flex-shrink-0">

        <Image
          src={
            doctor.image ||
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
          }
          alt={doctor.name || "Doctor"}
          fill
          className="object-cover"
        />

        {/* RATING */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">

          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />

            <p>
              {doctor.rating || "4.9"}
            </p>
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">

        <div className="flex-1">

          {/* NAME */}
          <h3 className="text-2xl font-bold text-gray-800">
            {doctor.name}
          </h3>

          {/* SPECIALITY */}
          <p className="text-cyan-700 font-semibold mt-1">
            {doctor.specialty}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-sm leading-7 mt-4 line-clamp-3">
            {doctor.description ||
              "No description available."}
          </p>

          {/* INFO */}
          <div className="mt-5 space-y-3 text-sm text-gray-500">

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-600" />

              <p>
                {doctor.location ||
                  "Location not specified"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <GiHospitalCross className="text-cyan-600" />

              <p>
                {doctor.hospital ||
                  "Hospital not specified"}
              </p>
            </div>

            <p>
              🩺 {doctor.experience || "N/A"} experience
            </p>

          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">

          <p className="text-2xl font-bold text-cyan-700">
            ৳{doctor.fee || "0"}
          </p>

         <Link href={`/appointments/doctor/${_id}`}> 
          <Button
            color="primary"
            size="sm"
            className="rounded-full px-5"
         
          >
            View Details
          </Button>
         </Link>

        </div>
      </div>
    </Card>
  );
};

export default AppointCard;