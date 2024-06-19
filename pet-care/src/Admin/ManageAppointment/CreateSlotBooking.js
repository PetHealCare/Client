import React, { useEffect, useState } from "react";
import { SERVICE_API, SLOT_API } from "../../apiEndpoint";

export default function CreateSlotBooking({ booking }) {
  const [slotBookingInfo, setSlotBookingInfo] = useState({
    doctorId: "", // Storing ID
    serviceId: 0,
    scheduleId: 0,
    status: true,
  });
  
  const [sẻvices, setSẻvices] = useState([]); // State to store list of doctors

  useEffect(() => {
    // Fetch list of doctors when the component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(SERVICE_API.MASTER);
      if (response.ok) {
        const data = await response.json();
        setSẻvices(data);
        console.error("Failed to fetch service". data);
      } else {
        console.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSlotBookingInfo({ ...slotBookingInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to create the slot booking
      const response = await fetch(SLOT_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slotBookingInfo),
      });
      if (response.ok) {
        console.log("Slot booking created successfully");
        // Redirect or navigate back to the ManageAppointment page
      } else {
        console.error("Failed to create slot booking");
      }
    } catch (error) {
      console.error("Error creating slot booking:", error);
    }
  };

  return (
    <div>
      <h2>Create Slot Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="doctorId">Doctor:</label>
          <select
            id="doctorId"
            name="doctorId"
            value={slotBookingInfo.serviceId}
            onChange={handleChange}
          >
            <option value="">Select Doctor</option>
            {/* Map over the doctors and create an option for each */}
            {sẻvices.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="serviceId">Service ID:</label>
          <input
            type="number"
            id="serviceId"
            name="serviceId"
            value={slotBookingInfo.serviceId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="scheduleId">Schedule ID:</label>
          <input
            type="number"
            id="scheduleId"
            name="scheduleId"
            value={slotBookingInfo.scheduleId}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Slot Booking</button>
      </form>
    </div>
  );
}
