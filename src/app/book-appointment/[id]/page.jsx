"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Input, Button } from "@heroui/react";
import { CalendarDays, Clock3, UserCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AppointmentPage() {
  const params = useParams();
  const { id } = params; 

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);


   
  const [formData, setFormData] = useState({
    userEmail: "user@gmail.com",
    patientName: "",
    gender: "Male",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });

  
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

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async () => {
  
    if (!formData.patientName || !formData.phone || !formData.date || !formData.time) {
      alert("Please fill up all fields");
      return;
    }

    setLoading(true);
    try {
     
      const appointmentData = {
        doctorId: id,               
        doctorName: doctor.name,       
        doctorSpecialty: doctor.specialty, 
        ...formData,                   
      };

    
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData), 
      });

      if (response.ok) {
        alert("");
       
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
        alert("Booking failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Not connect to the server");
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
        
     
        <div className="bg-cyan-500 p-6 sm:p-8 text-white">
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

        
        <div className="p-6 sm:p-8 space-y-6">
          
         
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

      
        <div className="p-6 sm:p-8 bg-gray-50/50 border-t border-gray-100">
          <Button 
            onClick={handleSubmit}
            isLoading={loading}
            color="primary" 
            className="w-full font-bold text-base h-12 rounded-xl bg-cyan-500 hover:from-blue-700 hover:to-indigo-700 shadow-md"
          >
            {loading ? "Booking..." : "Confirm Appointment Booking"}
          </Button>
        </div>

      </div>
    </div>
  );
}