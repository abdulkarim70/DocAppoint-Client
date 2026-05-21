

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const DoctorsDetailsPage = async ({ params }) => {
  const { id } = await params;
const {token}=auth.api.getToken({
  headers: await headers()
    
})

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
    
    { cache: "no-store",
    headers:{
      authorization:`Bearer ${token}`
    }
     }
  );

  const doctor = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-5xl w-full grid md:grid-cols-2 gap-8 p-8">

        {/* Left Side Image */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src={doctor?.image || "/doctor.jpg"}
            alt={doctor?.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side Details */}
        <div className="space-y-4">

          <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 text-sm rounded-full">
            {doctor?.speciality}
          </span>

          <h1 className="text-3xl font-bold text-gray-800">
            {doctor?.name}
          </h1>
  <div className="flex gap-1 items-center">
      <FaStar/>
          <p className="text-yellow-500 font-medium">
         {doctor?.rating || "4.9"} / 5.0
          </p>
  </div>

          <p className="text-gray-600">
            {doctor?.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4">

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-semibold">{doctor?.experience} years</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Hospital</p>
              <p className="font-semibold">{doctor?.hospital}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{doctor?.location}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="font-semibold">৳{doctor?.fee}</p>
            </div>

          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold mt-4">Availability</h3>
            <div className="flex gap-3 mt-2">
              {doctor?.availability?.map((time, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>

          {/* Button */}
         <Link href={`/book-appointment/${doctor._id}`}>
          <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl transition duration-300">
            Book Appointment
          </button>
         </Link>

        </div>
      </div>
    </div>
  );
};

export default DoctorsDetailsPage;