
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const LaborAttendanceHistory = () => {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; 
const navigate = useNavigate();


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get(
          `/attendance/paginated?page=${page}&limit=${limit}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHistory(res.data.records || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setMessage("Error fetching attendance history");
      }
    };
    if (token) fetchHistory();
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
              className="self-start mb-6 flex items-center text-blue-600 hover:underline font-medium transition"
            >
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
       Attendance History
      </h1>
      {message && <p className="text-red-600 text-center">{message}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-800 text-sm uppercase">
              <th className="border px-4 py-3 text-left">Date</th>
              <th className="border px-4 py-3 text-left">Place</th>
              <th className="border px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {history.length > 0 ? (
              history.map((entry, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border px-4 py-2">
                    {new Date(entry.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-2">{entry.place}</td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      entry.status === "Present"
                        ? "text-green-600"
                        : entry.status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {entry.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No records found
                </td>
              </tr>
            )}
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
    </div>
  );
};
export default LaborAttendanceHistory;
