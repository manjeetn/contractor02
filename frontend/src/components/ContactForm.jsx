import React, { useState } from 'react';
import api  from '../api/api.js';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await api.post('/forms/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setStatus('submission failed. Please fill all the field correctly.');
    }
    finally{
    setTimeout(() => setStatus(""), 3000);

    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow max-w-lg mx-auto">
        {status && <p className="mb-4 text-center font-semibold text-lg text-green-600">{status}</p>}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 mb-4 border rounded"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          required
          className="w-full p-3 mb-6 border rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
 