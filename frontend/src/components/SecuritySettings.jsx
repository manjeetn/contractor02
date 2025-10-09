 import React, { useState } from "react";
import api from "../api/api.js";
import { Eye, EyeOff } from "lucide-react";


const SecuritySettings = () => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
const[showNewPassword, setShowNewPassword] = useState(false);
const[showCurrentPassword, setShowCurrentPassword] = useState(false);
  
const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.post("users/change-password", form);
      setMessage("Password changed successfully!");
   setTimeout(() =>setMessage(""), 3000)
   setForm({
  currentPassword:"",
  newPassword:""
    })

    } catch (err) {
      setMessage("Error changing password!");
      setTimeout(() =>setMessage(""), 3000)

    }
  };

  return (
    <div className="space-y-12">
      <h2 className="text-xl font-semibold mb-4">Security</h2>
            {message && <p className="mt-3 mb-5 text-md text-center font-semibold text-green-600">{message}</p>}
      <form onSubmit={handlePasswordChange} className="space-y-4">
      <div className="relative">
        <input
          type={showCurrentPassword ? "text" : "password"}
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Current Password"
        />
      <button
      type="button"
      onClick={() =>setShowCurrentPassword(!showCurrentPassword)}
      className="absolute right-3 top-2.5 text-blue-500"
      >
     {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
     
      </button>  
     </div>
  
        <div className="relative">    
        <input
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="New Password"
        /> 
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-2.5 text-blue-500"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>    
         </div>    

         
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default SecuritySettings;
 