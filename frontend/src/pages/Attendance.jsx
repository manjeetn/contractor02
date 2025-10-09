
import React, { useEffect, useState, useContext } from "react";
import api from "../api/api.js";
import { AuthContext } from "../contexts/AuthContexts.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const AttendancePage = () => {
  const { token } = useContext(AuthContext);
  const [attendanceList, setAttendanceList] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; 
const navigate = useNavigate();
const fetchAttendance = async () => {
    try {
      const res = await api.get(
        `/attendance/paginated?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAttendanceList(res.data.records || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch attendance records");
      setAttendanceList([]);
    }
  };

  useEffect(() => {
    if (token) fetchAttendance();
  }, [token, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border">
     <button
    onClick={() => navigate(-1)}
    className="self-start mb-6 flex items-center text-blue-600 hover:underline  font-medium transition"
    >
    <ArrowLeft size={20} className="mr-2" /> 
    Back
    </button>     
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Attendance Records
      </h2>

      {message && <p className="text-red-600 mb-4 text-center">{message}</p>}

      {attendanceList.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          No attendance records found.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <th className="border  px-4 py-3 text-left">User</th>
                  <th className="border px-4 py-3 text-left">Date</th>
                  <th className="border px-4 py-3 text-left">Place</th>
                  <th className="border px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {attendanceList.map((record) => (
                  <tr
                    key={record._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border font-semibold px-4 py-2">
                      {record.userId?.name || "Unknown"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(record.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="border px-4 py-2">{record.place}</td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        record.status === "Present"
                          ? "text-green-600"
                          : record.status === "Absent"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-500"
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-500"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendancePage;
