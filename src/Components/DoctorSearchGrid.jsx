"use client"; 

import { useState, useMemo } from "react";
import AppointCard from "@/components/AppointCard"; 

export default function DoctorSearchGrid({ doctors = [] }) {
  const [search, setSearch] = useState("");

 

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) =>
      (doctor?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase().trim())
    );
  }, [doctors, search]);

  return (
    <div>
      {/* SEARCH BOX */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <AppointCard
              key={doctor?._id || doctor?.id}
              doctor={doctor}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">
              No doctor found matching "{search}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}