
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { ArrowLeft } from "lucide-react";

const LaborDashboard = () => {
  const { token } = useContext(AuthContext);
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [yesterdayAttendance, setYesterdayAttendance] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentAttendance = async () => {
      try {
        const res = await api.get("/attendance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const records = Array.isArray(res.data) ? res.data : [];

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000) // 24 hrs back
          .toISOString()
          .split("T")[0];

        setTodayAttendance(records.find((r) => new Date(r.date).toISOString().startsWith(today)));
        setYesterdayAttendance(
          records.find((r) =>new Date(r.date).toISOString().startsWith(yesterday)));
      } catch (err) {
        console.error("Error fetching attendance", err);
      }
    };

    if (token) fetchRecentAttendance();
  }, [token, status]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/labor-payments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data) ? res.data : [];
        setRecentPayments(data.slice(0, 2)); 
      } catch (err) {
        console.error("Error fetching payments", err);
      }
    };

    if (token) fetchPayments();
  }, [token]);


const handleAttendance = async (present) => {
  if (!place.trim()) {
    setMessage("Please enter the site/place before marking attendance.");
    return;
  }
  try {
    const today = new Date().toISOString().split("T")[0];
    const newStatus = present ? "Present" : "Absent";

    await api.post(
      "/attendance",
      { place, date: today, status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setStatus(newStatus);
    setMessage(`Attendance marked as ${newStatus}`);
    setPlace("");

    const res = await api.get("/attendance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const records = Array.isArray(res.data) ? res.data : [];

    const todayDate = new Date().toISOString().split("T")[0];
    const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    setTodayAttendance(records.find((r) => r.date.startsWith(todayDate)) || null);
    setYesterdayAttendance(records.find((r) => r.date.startsWith(yesterdayDate)) || null);
  } catch (err) {
    setMessage(err.response?.data?.message || "Error marking attendance");
  }
};



  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-50 rounded-xl shadow-md space-y-8">
      
    <button
    onClick={() => navigate(-1)}
    className="self-start mb-6 flex items-center text-blue-600 hover:underline  font-medium transition"
    >
    <ArrowLeft size={20} className="mr-2" /> 
    Back
    </button>

      <h1 className="text-2xl font-bold">Mark Attendance</h1>
      <label className="block">
        Site / Place:
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter site/place name"
        />
      </label>

      <div className="flex space-x-4">
        <button
          onClick={() => handleAttendance(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Mark Present
        </button>
        <button
          onClick={() => handleAttendance(false)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Mark Absent
        </button>
      </div>

      {message && (
        <p className="text-center text-green-600 font-medium">{message}</p>
      )}

      
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Attendance</h2>
        <p className="bg-blue-200 rounded-md mb-2 p-2">
          <strong>Today:</strong>{" "}
          {todayAttendance ? (
            <span className="text-blue-700">{todayAttendance.status}</span>
          ) : (
            "Not marked yet"
          )}
        </p>
        <p className="bg-blue-200 rounded-md p-2">
          <strong>Yesterday:</strong>{" "}
          {yesterdayAttendance ? (
            <span className="text-blue-600">{yesterdayAttendance.status}</span>
          ) : (
            "No record"
          )}
        </p>
        <div className="mt-2 text-right">
          <Link
            to="/labor/attendance"
            className="text-blue-600 hover:underline font-medium"
          >
            See full attendance history →
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Payments</h2>
        {recentPayments.length === 0 ? (
          <p>No recent payments.</p>
        ) : (
          <ul className="space-y-2">
            {recentPayments.map((p) => (
              <li
                key={p._id}
                className="flex justify-between p-2 bg-blue-200 rounded"
              >
                <span className="text-green-800 font-semibold">₹{p.amount.toFixed(2)}</span>
                <span>{new Date(p.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2 text-right">
          <Link
            to="/labor/payments"
            className="text-blue-600 hover:underline font-medium"
          >
            See full payment history →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaborDashboard;



