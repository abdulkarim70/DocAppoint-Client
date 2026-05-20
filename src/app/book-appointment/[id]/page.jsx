"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  TextArea,
} from "@heroui/react";

import { CalendarDays, Clock3 } from "lucide-react";

export default function AppointmentPage() {
  const params = useParams();
  const { id } = params;

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`

      );

      const data = await res.json();
      setDoctor(data);
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center max-w-5xl mx-auto mt-10 mb-10 bg-gray-100 p-4">
      <Modal isOpen={true} size="2xl" backdrop="blur">
        <div className="bg-white p-6 rounded-2xl w-full">

          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">
              Book Appointment
            </h2>

            <p className="text-sm text-gray-500">
              with {doctor.name}
            </p>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-4">

              {/* User Email */}
              <Input
                label="User Email"
                defaultValue="user@gmail.com"
                variant="bordered"
              />

              {/* Doctor Name */}
              <Input
                label="Doctor Name"
                defaultValue={doctor.name}
                isReadOnly
                variant="flat"
              />

              {/* Specialist */}
              <Input
                label="Specialist"
                defaultValue={doctor.specialist}
                isReadOnly
                variant="flat"
              />

              {/* Patient */}
              <Input
                label="Patient Name"
                placeholder="Full name"
                variant="bordered"
              />

              {/* Gender + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Gender
                  </label>

                  <select className="w-full border rounded-xl px-3 py-3 outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <Input
                  label="Phone"
                  placeholder="01XXXXXXXXX"
                  variant="bordered"
                />
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Input
                  type="date"
                  label="Date"
                  variant="bordered"
                  endContent={
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                  }
                />

                <Input
                  type="time"
                  label="Time"
                  variant="bordered"
                  endContent={
                    <Clock3 className="w-4 h-4 text-gray-400" />
                  }
                />
              </div>

              {/* Reason */}
              <TextArea
                label="Reason (optional)"
                placeholder="Brief reason for visit"
                variant="bordered"
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" className="w-full">
              Confirm Booking
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}