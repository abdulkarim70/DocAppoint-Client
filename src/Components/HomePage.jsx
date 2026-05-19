"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Card, Button } from "@heroui/react";

import {
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

import { GiHospitalCross } from "react-icons/gi";

export default function HomePage() {
  const router = useRouter();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const heroSlides = [
    {
      id: 1,
      title: <>Find Trusted <br /> Doctors Easily</>,
      desc: "Book appointments instantly with top specialists near you.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
    },
    {
      id: 2,
      title: <>Consult Top <br /> Specialists Online</>,
      desc: "Get expert medical advice from the comfort of your home.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d" 
    }
  ];

  // ================= FETCH DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);


  const handleViewDetails = (id) => {
    router.push(`appointments/doctor/${id}`);
  };

  return (
    <div>
      
   
      <style jsx global>{`
        .swiper {
          display: flex !important;
          flex-direction: column;
        }
        .swiper-wrapper {
          align-items: stretch !important; 
        }
        .swiper-slide {
          height: auto !important; 
          display: flex !important;
        }
      `}</style>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="grid md:grid-cols-2 gap-10 items-center w-full pb-10">
                  {/* LEFT */}
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800">
                      {slide.title}
                    </h1>
                    <p className="text-gray-600 mt-6 text-lg leading-8">
                      {slide.desc}
                    </p>
                    <Button
                      color="primary"
                      size="lg"
                      className="mt-8 rounded-full px-8"
                    >
                      Book Appointment
                    </Button>
                  </div>

                  {/* RIGHT */}
                  <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl w-full">
                    <Image
                      src={slide.image}
                      alt="Doctor Hero"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= TOP DOCTORS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADING */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Top Rated Doctors</h2>
            <p className="text-gray-500 mt-3">
              Highly reviewed specialists ready to help you.
            </p>
          </div>

          {/* ERROR */}
          {error && <p className="text-center text-red-500 mb-6">{error}</p>}

          {/* LOADING */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[520px] bg-gray-200 animate-pulse rounded-3xl"
                />
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-500">No doctors found</p>
          ) : (
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop
              spaceBetween={25}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {doctors.slice(0, 3).map((doctor) => (
                <SwiperSlide key={doctor.id}>
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
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                      {/* RATING */}
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-500" />
                          <p>4.9</p>
                        </div>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {doctor.name}
                        </h3>
                        <p className="text-cyan-700 font-semibold mt-1">
                          {doctor.specialty}
                        </p>
                        <p className="text-gray-500 text-sm leading-7 mt-4 line-clamp-3">
                          {doctor.description}
                        </p>

                        {/* INFO */}
                        <div className="mt-5 space-y-3 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-cyan-600" />
                            <p>{doctor.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <GiHospitalCross className="text-cyan-600" />
                            <p>{doctor.hospital}</p>
                          </div>
                          <p>🩺 {doctor.experience} experience</p>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                        <p className="text-2xl font-bold text-cyan-700">
                          ৳{doctor.fee}
                        </p>
                        <Button
                          color="primary"
                          size="sm"
                          className="rounded-full px-5"
                          onClick={() => handleViewDetails(doctor._id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose DocAppoint?</h2>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: "Verified Doctors",
                desc: "All doctors are verified and experienced specialists.",
              },
              {
                title: "Instant Booking",
                desc: "Book appointments quickly without waiting in line.",
              },
              {
                title: "24/7 Support",
                desc: "Our support team is always ready to help you.",
              },
            ].map((item, index) => (
              <div key={index} className="flex">
                <Card
                  className="
                    w-full p-10 rounded-3xl shadow-md flex flex-col justify-between
                    hover:-translate-y-2 hover:shadow-xl
                    duration-300
                  "
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-500 leading-7">{item.desc}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Patient Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              "Excellent doctors and amazing service.",
              "Very easy appointment booking system.",
              "Highly recommended healthcare platform.",
            ].map((review, index) => (
              <div key={index} className="flex">
                <Card
                  className="
                    w-full p-10 rounded-3xl shadow-md flex flex-col justify-between
                    hover:-translate-y-2 hover:shadow-xl
                    duration-300
                  "
                >
                  <p className="text-gray-600 leading-8">{review}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}