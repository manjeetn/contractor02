import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import api from "../api/api.js";

const AccountSettings = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", form); 
      setMessage("Profile updated successfully!");
         setForm({
        name: "",
        email: "",
      });
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      setMessage("Error updating profile");
     setTimeout(() => setMessage(""), 3000);
   }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Email"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-gray-200">{message}</p>}
    </div>
  );
};

export default AccountSettings;
