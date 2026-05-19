import AppointCard from "@/Components/AppointCard";

const fetchDoctor = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data;
};

const AllAppointmentPage = async () => {
  const doctors = await fetchDoctor();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* HEADING */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          All Doctors
        </h1>

        <p className="text-gray-500 mt-3">
          Find and book appointments with experienced doctors.
        </p>
      </div>

      {/* DOCTORS GRID */}
      <div
        className="
          grid gap-6

          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {doctors.map((doctor) => (
          <AppointCard
            key={doctor._id}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default AllAppointmentPage;