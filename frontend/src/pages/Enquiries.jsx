
import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Enquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [quotes, setQuotes] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactRes, quoteRes] = await Promise.all([
          api.get("forms/contact"),
          api.get("/forms/quote"),
        ]);
        setContacts(contactRes.data || []);
        setQuotes(quoteRes.data || []);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
      }
    };
    fetchData();
  }, []);

  
  const TableCard = ({ title, columns, data, accentColor }) => (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-100">
 
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-xl font-bold`}
          style={{ color: accentColor }}
        >
          {title}
        </h2>
        <span
          className="text-sm px-3 py-1 rounded-full font-medium"
          style={{
            backgroundColor: `${accentColor}20`, // light tint
            color: accentColor,
          }}
        >
          {data.length} enquiries
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead
            className="text-white"
            style={{ backgroundColor: accentColor }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left font-semibold tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No enquiries found.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-gray-50 transition-colors border-b"
                >
                  {Object.values(row).slice(1).map((val, idx) => (
                    <td key={idx} className="px-4 py-3 text-gray-700">
                      {val}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      
    <button
    onClick={() => navigate(-1)}
    className="self-start mb-6 flex items-center text-blue-600 hover:underline  font-medium transition"
    >
    <ArrowLeft size={20} className="mr-2" /> 
    Back
    </button>

      <h1 className="text-3xl font-bold mb-10 text-gray-800">
       Enquiries Dashboard
      </h1>

      <TableCard
        title="Contact Form Submissions"
        columns={["Name", "Phone", "Email", "Message"]}
        accentColor="#3e5994ff" 
        data={contacts.map((c) => ({
          _id: c._id,
          name: c.name,
          phone: c.phone,
          email: c.email,
          message: c.message,
        }))}
      />

      <TableCard
        title="Quote Requests"
        columns={["Name", "Service", "Email", "Phone", "Message"]}
        accentColor="#16a575ff" 
        data={quotes.map((q) => ({
          _id: q._id,
          name: q.fullName,
          service: q.service,
          email: q.email,
          phone: q.phone,
          message: q.message,
        }))}
      />
    </div>
  );
};

export default Enquiries;
