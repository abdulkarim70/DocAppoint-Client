import DoctorSearchGrid from "@/components/DoctorSearchGrid";

export const metadata = {
  title: "All Doctors | DocAppoint",
  description: "Find and book doctors easily",
};

const fetchDoctors = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  
    const res = await fetch(`${apiUrl}/doctors`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch doctors");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export default async function AllDoctorsPage() {
  const doctors = await fetchDoctors();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
    
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">All Doctors</h1>
        <p className="text-gray-500 mt-3">
          Search and book appointments easily
        </p>
      </div>

      
      <DoctorSearchGrid doctors={doctors} />
    </div>
  );
}