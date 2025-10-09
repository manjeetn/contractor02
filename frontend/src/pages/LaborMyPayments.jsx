
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LaborMyPayments = () => {
  const { token } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const navigate = useNavigate();

  const fetchSummary = async () => {
    try {
      const res = await api.get("/labor-payments/my/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalPaid(res.data.totalPaid || 0);
    } catch (err) {
      console.error("Error fetching summary:", err);
      setTotalPaid(0);
    }
  };

  const fetchMyPayments = async () => {
    try {
      const res = await api.get(
        `/labor-payments/paginated?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPayments(res.data.records || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      setMessage("Failed to load your payments");
    }
  };

  useEffect(() => {
    if (token) {
      fetchSummary();
      fetchMyPayments();
    }
  }, [token, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border mt-8">
       <button
              onClick={() => navigate(-1)}
              className="self-start mb-6 flex items-center text-blue-600 hover:underline font-medium transition"
            >
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        💰 My Payments
      </h1>

      <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-sm text-center">
        <h2 className="text-lg font-semibold text-green-700">Total Paid</h2>
        <p className="text-2xl font-bold text-green-900">
          ₹{totalPaid.toLocaleString()}
        </p>
      </div>

      {message && <p className="mb-4 text-red-600 text-center">{message}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
              <th className="border px-4 py-3 text-right">Amount</th>
              <th className="border px-4 py-3 text-left">Note</th>
              <th className="border px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border px-4 py-2 text-right font-semibold text-green-700">
                    ₹{p.amount.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{p.note || "-"}</td>
                  <td className="border px-4 py-2">
                    {new Date(p.date).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
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

export default LaborMyPayments;
