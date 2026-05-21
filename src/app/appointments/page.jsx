import DoctorSearchGrid from "@/Components/DoctorSearchGrid";

export const metadata = {
  title: "All-Appoint",
  description: "All Available Doctor Here",
};

const fetchDoctor = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
      { cache: "no-store" }
    );

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const AllAppointmentPage = async () => {
  const doctors = await fetchDoctor();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* HEADING */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">All Doctors</h1>
        <p className="text-gray-500 mt-3">
          Find and book appointments with experienced doctors.
        </p>
      </div>

      {/* SEARCH + GRID */}
      <DoctorSearchGrid doctors={doctors} />
    </div>
  );
};

export default AllAppointmentPage;