
import { useState } from "react";
import api from "../api/api.js";

function QuoteForm() {
  const [form, setForm] = useState({ fullName: "", service: "", email: "", phone: "", message: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.post("/forms/quote", form);
      setMessage("Quote request submitted!");
      setForm({ fullName: "", service: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
       setMessage("Failed to submit quote.Please fill all the fields correctly");
    } finally{
       setTimeout(() => setMessage(""), 3000);

    }

  };

  return (
        <section id="quote" className="w-full max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Send Quote</h2>
      {message && <p className="mb-4 text-center text-lg text-green-600 font-semibold">{message}</p>}

    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow max-w-lg mx-auto">
      <input type="text"
       name="fullName" 
       placeholder="Full Name"
        value={form.fullName} 
        onChange={handleChange}
        className="border p-3 mb-4 w-full rounded" 
        required
        />

      <input type="text"
       name="service" 
       placeholder="Service Needed"
        value={form.service} 
        onChange={handleChange}
        className="border p-3 mb-4 w-full rounded"
        required 
        />

      <input type="email"
       name="email"
        placeholder="Your Email"
        value={form.email} 
        onChange={handleChange}
        className="border p-3 mb-4 w-full rounded"
        required 
        />

      <input type="text" 
      name="phone" 
      placeholder="Your Phone"
        value={form.phone} 
        onChange={handleChange}
        className="border p-3 mb-4 w-full rounded"
        required
         />

      <textarea name="message"
       placeholder="Additional Details"
       value={form.message}
       onChange={handleChange}
        className="border p-3 mb-4 w-full rounded" 
        />
      <button type="submit"
       className="w-full bg-green-700 text-white p-3 rounded hover:bg-green-600 transition">
        Get Quote
      </button>
    </form>
     </section>
  );
}
export default QuoteForm;
