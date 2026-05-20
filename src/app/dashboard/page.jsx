"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import { User, Calendar, Clock, Edit2, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; 

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  const currentUserEmail = "user@gmail.com"; 

  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${currentUserEmail}`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Booking Data Loading Problem");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleDelete = async (id) => {
    if (confirm("Will delete this booking?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setBookings(bookings.filter((b) => b._id !== id));
          toast.success("Booking Successfully Deleted"); 
        } else {
          toast.error("Unable to delete");
        }
      } catch (error) {
        console.error(error);
        toast.error("Server Problem"); 
      }
    }
  };


  const openEditModal = (booking) => {
    setSelectedBooking({ ...booking });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleUpdateSubmit = async () => {
    setUpdateLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${selectedBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedBooking),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Booking data successfully updated"); // সাকসেস টোস্ট
        setIsEditModalOpen(false);
        fetchBookings(); 
      } else {
        toast.error("unable to update");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong ");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 min-h-screen relative">
   
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>

    
      <div className="flex gap-2 mb-8 bg-gray-100 p-1 w-fit rounded-xl">
        <button onClick={() => setActiveTab("bookings")} className={`px-4 py-2 text-sm font-semibold rounded-xl ${activeTab === "bookings" ? "bg-white shadow-sm" : "text-gray-500"}`}>My Bookings</button>
        <button onClick={() => setActiveTab("profile")} className={`px-4 py-2 text-sm font-semibold rounded-xl ${activeTab === "profile" ? "bg-white shadow-sm" : "text-gray-500"}`}>My Profile</button>
      </div>

      {activeTab === "bookings" ? (
        loading ? (
          <div className="text-gray-500 animate-pulse">লোড হচ্ছে...</div>
        ) : bookings.length === 0 ? (
          <div className="text-gray-500 border border-dashed rounded-2xl p-8 text-center bg-white">
           No booking available for you
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-xl font-bold text-teal-600 mb-4">{booking.doctorName}</h3>
                <div className="space-y-3 text-slate-600 text-sm mb-6">
                  <div className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /><span><strong>Patient:</strong> {booking.patientName}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /><span><strong>Date:</strong> {booking.date}</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /><span><strong>Time:</strong> {booking.time}</span></div>
                  <div><span className="text-gray-400">Reason:</span> {booking.reason || "N/A"}</div>
                </div>
                <div className="flex gap-3">
                  <Button variant="bordered" size="sm" className="rounded-xl" startContent={<Edit2 className="w-3.5 h-3.5" />} onClick={() => openEditModal(booking)}>Update</Button>
                  <Button color="danger" size="sm" className="rounded-xl" startContent={<Trash2 className="w-3.5 h-3.5" />} onClick={() => handleDelete(booking._id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : <div>Profile Content</div>}

     
      {isEditModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
              <h2 className="font-bold text-lg">Update Appointment</h2>
              <button onClick={() => setIsEditModalOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Patient Name</label>
                <Input name="patientName" value={selectedBooking.patientName} onChange={handleEditInputChange} variant="bordered" radius="xl" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Phone</label>
                <Input name="phone" value={selectedBooking.phone} onChange={handleEditInputChange} variant="bordered" radius="xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">Date</label>
                  <Input type="date" name="date" value={selectedBooking.date} onChange={handleEditInputChange} variant="bordered" radius="xl" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase">Time</label>
                  <Input type="time" name="time" value={selectedBooking.time} onChange={handleEditInputChange} variant="bordered" radius="xl" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Reason</label>
                <textarea name="reason" value={selectedBooking.reason} onChange={handleEditInputChange} rows={2} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none bg-transparent" />
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t flex gap-3">
              <Button size="md" variant="bordered" className="w-full rounded-xl" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button size="md" color="primary" className="w-full rounded-xl bg-teal-600 hover:bg-teal-700" isLoading={updateLoading} onClick={handleUpdateSubmit}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}