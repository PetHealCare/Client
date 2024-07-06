import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { SCHEDULE_API, DOCTOR_API } from "../../apiEndpoint";
import { useAuth } from "../../Components/Login/Authen";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopHeader from "../../Components/Sidebar/TopHeader";

export default function AddSchedule() {
  const { user, logout } = useAuth();
  const [doctorId, setDoctorId] = useState("");
  const [roomNo, setroomNo] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await fetch(DOCTOR_API.MASTER);
      const data = await response.json();
      setDoctors(data.data.items);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error fetching doctors: " + error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(SCHEDULE_API.MASTER);
      const data = await response.json();

      // Log the entire data object to inspect its structure
      console.log("API Response Data:", data);

      // Ensure data.data exists and has 'items'
      if (data) {
        return data;
      } else {
        console.error("API Response structure incorrect:", data);
        toast.error(
          "Error fetching schedules: Unexpected API response structure"
        );
        return [];
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Error fetching schedules: " + error.message);
      return [];
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    if (!doctorId || !roomNo || !startTime || !endTime) {
      toast.error("Please fill out all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const schedules = await fetchSchedules();
      const newStartTime = new Date(startTime).getTime();
      const newEndTime = new Date(endTime).getTime();
      console.log("data schedules: ", schedules);

      const isOverlapping = schedules.some((schedule) => {
        const scheduleStartTime = new Date(schedule.startTime).getTime();
        const scheduleEndTime = new Date(schedule.endTime).getTime();
        return (
          schedule.roomNo === roomNo &&
          ((newStartTime >= scheduleStartTime &&
            newStartTime < scheduleEndTime) ||
            (newEndTime > scheduleStartTime && newEndTime <= scheduleEndTime) ||
            (newStartTime <= scheduleStartTime &&
              newEndTime >= scheduleEndTime))
        );
      });

      if (isOverlapping) {
        toast.error("roomNo is already booked for the selected time slot");
        setIsSubmitting(false);
        return;
      }

      const newSchedule = {
        doctorId,
        roomNo,
        startTime,
        endTime,
        slotBooking: 1,
        status: true,
      };

      const response = await fetch(SCHEDULE_API.MASTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSchedule),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Schedule added successfully!");
        setTimeout(() => navigate("/manage-schedule"), 1000);
      } else {
        console.error(
          "Error adding schedule:",
          response.status,
          response.statusText,
          result.message
        );
        toast.error("Error adding schedule: " + result.message);
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      toast.error("Error adding schedule: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper doctris-theme toggled">
      <ToastContainer />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="page-content bg-light" style={{ marginTop: "10px" }}>
        <TopHeader />
        <div className="layout-specing">
          <div className="row">
            <div className="col-xl-9 col-md-6">
              <h5 className="mb-0">Schedules</h5>
              <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Doctris</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Schedules
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
              <Link to="/manage-schedule" className="btn btn-primary">
                Back to Schedules
              </Link>
            </div>
            <h2>Add New Schedule</h2>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "40vh" }}
            >
              <div className="rounded shadow mt-4">
                <div className="p-4">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Doctor</label>
                          <select
                            className="form-select"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            required
                          >
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor) => (
                              <option
                                key={doctor.doctorId}
                                value={doctor.doctorId}
                              >
                                {doctor.fullName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Room</label>
                          <select
                            className="form-select"
                            value={roomNo}
                            onChange={(e) => setroomNo(e.target.value)}
                            required
                          >
                            <option value="">Select room</option>
                            {[
                              "Room 101",
                              "Room 102",
                              "Room 103",
                              "Room 104",
                            ].map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* <!--end col--> */}

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Time</label>
                          <input
                            name="startTime"
                            type="datetime-local"
                            className="form-control"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {/* <!--end col--> */}

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Time</label>
                          <input
                            name="endTime"
                            type="datetime-local"
                            className="form-control"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                    <div className="row">
                      <div className="col-md-12 text-end">
                        <button type="submit" className="btn btn-primary">
                          Add New Schedule
                        </button>
                      </div>
                    </div>
                    {/* <!--end row--> */}
                  </form>
                  {/* <!--end form--> */}
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
        </div>
      </div>
      {/* Footer Start */}
      <footer className="bg-footer-color shadow py-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <div className="text-sm-start text-center">
                <p className="mb-0 text-muted">
                  {new Date().getFullYear()} © Doctris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}
    </div>
  );
}
