
import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const AdminLaborPayments = () => {
  const { token } = useContext(AuthContext);

  const [labors, setLabors] = useState([]);
  const [selectedLabor, setSelectedLabor] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; 
const navigate = useNavigate();

  const fetchLabors = async () => {
    try {
      const res = await api.get("/users?role=labor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLabors(Array.isArray(res.data) ? res.data : []);
      if (res.data.length > 0) {
        setSelectedLabor(res.data[0]._id);
      }
    } catch (error) {
      setMessage("Failed to load labor users");
    }
  };
 
   const fetchPayments = async (pageNum = 1) => {
    try {
      const res = await api.get(`/labor-payments/paginated?page=${pageNum}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(Array.isArray(res.data.records) ? res.data.records : []);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setMessage("Failed to load payments");
    }
  };

const fetchSummary = async () => {
  try {
    const res = await api.get("/labor-payments/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSummary(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    if (token) {
      fetchLabors();
      fetchPayments(page);
      fetchSummary();
    }
  }, [token, page]);

  const handleAddPayment = async () => {
    if (!selectedLabor || !amount) {
      setMessage("Please select labor and enter amount");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      setMessage("Please enter a valid amount greater than zero");
      setTimeout(() => setMessage(""), 3000);      
      return;
    }
    try {
      await api.post(
        "/labor-payments",
        { laborId: selectedLabor, amount: Number(amount), note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Payment added successfully");
      setAmount("");
      setNote("");
      fetchPayments(page);
      fetchSummary();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding payment");
    }
    finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const laborTotals = payments.reduce((acc, p) => {
    const laborName = p.laborId?.name || "Unknown";
    if (!acc[laborName]) {
      acc[laborName] = 0;
    }
    acc[laborName] += p.amount;
    return acc;
  }, {});

  return (
    <div className=" p-6 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border mt-10">
    <button
    onClick={() => navigate(-1)}
    className="self-start mb-6 flex items-center text-blue-600 hover:underline  font-medium transition"
    >
    <ArrowLeft size={20} className="mr-2" /> 
    Back
    </button>   

      <h1 className="text-2xl font-bold mb-4 text-center text-yellow-600">
         Labor Payments
      </h1>
      <hr />
      {message && <p className="mb-4 text-center text-green-600 font-semibold">{message}</p>}

      <h2 className="text-xl font-semibold m-3 text-green-600">Payments Summary</h2>
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  {summary.map((s) => (
    <div
      key={s.email}
      className="p-4 bg-green-100 text-green-800 rounded-lg shadow"
    >
      <p className="text-sm font-semibold">{s.labor}</p>
      <h3 className="text-2xl font-bold">₹{s.totalPaid.toFixed(2)}</h3>
    </div>
  ))}
</div>


      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block mb-1 font-semibold">Select Labor</label>
          <select
            value={selectedLabor}
            onChange={(e) => setSelectedLabor(e.target.value)}
            className="border p-2 rounded"
          >
            {labors.map((labor) => (
              <option key={labor._id} value={labor._id}>
                {labor.name} 
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-semibold">Note</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Optional note"
          />
        </div>

        <button
          onClick={handleAddPayment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Payment
        </button>
      </div>

      <h2 className="text-xl font-bold mb-3 text-gray-800">Payments History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
              <th className="border px-4 py-3 text-left">Labor</th>
              <th className="border px-4 py-3 text-right">Amount</th>
              <th className="border px-4 py-3 text-left">Note</th>
              <th className="border px-4 py-3 text-left">Date</th>
              <th className="border px-4 py-3 text-left">Recorded By</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border font-semibold text-gray-800 px-4 py-2">{p.laborId?.name || "N/A"}</td>
                  <td className="border px-4 py-2 text-right font-semibold text-green-700">
                    ₹{p.amount.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{p.note || "-"}</td>
                  <td className="border px-4 py-2">
                    {new Date(p.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border text-blue-500 font-semibold px-4 py-2">{p.createdBy?.name || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-800 font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 text-white py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default AdminLaborPayments;
