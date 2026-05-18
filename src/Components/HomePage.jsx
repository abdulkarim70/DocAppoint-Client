"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Image from "next/image";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const isLoggedIn = false;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments`
        );
        const data = await res.json();
        console.log(data);
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewDetails = (id) => {
    router.push(isLoggedIn ? `/doctor/${id}` : "/login");
  };

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="py-20 bg-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <Swiper spaceBetween={30} slidesPerView={1}>
            {[1, 2].map((slide) => (
              <SwiperSlide key={slide}>
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h1 className="text-5xl font-bold mb-5">
                      Find Trusted Doctors Easily
                    </h1>
                    <p className="text-gray-600 mb-6">
                      Book appointments instantly with top specialists.
                    </p>
                    <Button color="primary" size="lg">
                      Book Appointment
                    </Button>
                  </div>

                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                      alt="Doctor"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= DOCTORS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Top Rated Doctors
          </h2>

          {loading ? (
            <p className="text-center">Loading doctors...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="p-6 rounded-2xl shadow-lg">
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-4">
                    {doctor.name}
                  </h3>

                  <p className="text-gray-500">
                    {doctor.specialty}
                  </p>

                  <p className="text-yellow-500 font-semibold mt-2">
                    ⭐ {doctor.rating}
                  </p>

                  <Button
                    color="primary"
                    className="mt-4"
                    onClick={() =>
                      handleViewDetails(doctor.id)
                    }
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10">
            Why Choose DocAppoint?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Verified Doctors",
              "Instant Booking",
              "24/7 Support",
            ].map((item, i) => (
              <Card key={i} className="p-8">
                <h3 className="text-xl font-semibold mb-3">
                  {item}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Patient Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Excellent doctors!",
              "Very easy booking!",
              "Highly recommended!",
            ].map((review, i) => (
              <Card key={i} className="p-8">
                <p>{review}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}