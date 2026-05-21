"use client";

import { useState } from "react";
import AppointCard from "@/Components/AppointCard";

export default function DoctorSearchGrid({ doctors = [] }) {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    (doctor?.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* SEARCH INPUT */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <AppointCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No doctor found
          </p>
        )}
      </div>
    </div>
  );
}