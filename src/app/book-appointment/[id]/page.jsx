"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Input, Button } from "@heroui/react";
import { CalendarDays, Clock3, UserCheck } from "lucide-react";

export default function AppointmentPage() {
  const params = useParams();
  const { id } = params; // এটিই হচ্ছে ডাক্তারের আইডি (doctorId)

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  // ইউজারের ডাটা স্টেট ট্র্যাকিং
  const [formData, setFormData] = useState({
    userEmail: "user@gmail.com",
    patientName: "",
    gender: "Male",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  // ডাক্তারের ডাটা ফেচ করা
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`
        );
        const data = await res.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  // ইনপুটের পরিবর্তন ট্র্যাক করার ফাংশন
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // মঙ্গোডিবি ব্যাকএন্ডে ডাক্তারের তথ্যসহ সব ডাটা পাঠানোর ফাংশন
  const handleSubmit = async () => {
    // সাধারণ ভ্যালিডেশন
    if (!formData.patientName || !formData.phone || !formData.date || !formData.time) {
      alert("দয়া করে প্রয়োজনীয় সব ফিল্ড পূরণ করুন।");
      return;
    }

    setLoading(true);
    try {
      // এখানে ইউজারের ডাটা এবং ডাক্তারের ডাটা একসাথে জোড়া লাগানো হয়েছে
      const appointmentData = {
        doctorId: id,                  // ইউআরএল থেকে নেওয়া ডাক্তারের আইডি
        doctorName: doctor.name,        // ফেচ করা ডাক্তারের নাম
        doctorSpecialty: doctor.specialty, // ফেচ করা ডাক্তারের স্পেশালিটি
        ...formData,                   // ইউজারের ইনপুট করা সব ডাটা
      };

      // মঙ্গোডিবি ব্যাকএন্ড API এন্ডপয়েন্ট
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData), // সম্পূর্ণ ডাটা পাঠানো হচ্ছে
      });

      if (response.ok) {
        alert("ডাক্তারের তথ্যসহ অ্যাপয়েন্টমেন্ট সফলভাবে মঙ্গোডিবিতে সেভ হয়েছে!");
        // ফর্ম রিসেট
        setFormData({
          userEmail: "user@gmail.com",
          patientName: "",
          gender: "Male",
          phone: "",
          date: "",
          time: "",
          reason: "",
        });
      } else {
        alert("বুকিং ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("সার্ভারে সংযোগ করা যাচ্ছে না।");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xl font-medium text-gray-600">
        <div className="animate-pulse">Loading appointment details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* কার্ড হেডার */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-6 h-6 text-blue-200" />
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Book Appointment
            </h2>
          </div>
          <p className="text-blue-100 text-sm sm:text-base font-normal">
            Secure your session with <span className="font-semibold text-white underline decoration-blue-300 underline-offset-4">{doctor.name}</span>
          </p>
        </div>

        {/* কার্ড বডি */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* User Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
              User Email
            </label>
            <Input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              variant="bordered"
              placeholder="Enter your email"
              radius="xl"
            />
          </div>

          {/* Doctor Info Group (এই তথ্যগুলোও ডাটাবেজে যাবে) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-blue-800 uppercase tracking-wider">
                Doctor Name
              </label>
              <Input
                value={doctor.name}
                isReadOnly
                variant="flat"
                radius="xl"
                className="bg-white/80"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-blue-800 uppercase tracking-wider">
                Specialist
              </label>
              <Input
                value={doctor.specialty}
                isReadOnly
                variant="flat"
                radius="xl"
                className="bg-white/80"
              />
            </div>
          </div>

          {/* Patient Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Patient Name *
            </label>
            <Input
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Full name of the patient"
              variant="bordered"
              radius="xl"
            />
          </div>

          {/* Gender + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Gender
              </label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full h-10 border border-gray-200 hover:border-gray-400 focus:border-blue-500 transition-all rounded-xl px-3 outline-none bg-transparent text-sm shadow-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Phone Number *
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="01XXXXXXXXX"
                variant="bordered"
                radius="xl"
              />
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Appointment Date *
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                variant="bordered"
                radius="xl"
                endContent={
                  <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" />
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Preferred Time *
              </label>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                variant="bordered"
                radius="xl"
                endContent={
                  <Clock3 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                }
              />
            </div>
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Reason for Visit (optional)
            </label>
            <textarea 
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Briefly describe your symptoms..."
              rows={3}
              className="w-full border border-gray-200 hover:border-gray-400 focus:border-blue-500 transition-all rounded-xl p-3 text-sm outline-none bg-transparent resize-none shadow-sm"
            />
          </div>

        </div>

        {/* কার্ড ফুটার */}
        <div className="p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100">
          <Button 
            onClick={handleSubmit}
            isLoading={loading}
            color="primary" 
            className="w-full font-bold text-base h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
          >
            {loading ? "Booking..." : "Confirm Appointment Booking"}
          </Button>
        </div>

      </div>
    </div>
  );
}