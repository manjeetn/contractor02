
import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const initialForm = {
  projectName: "",
  client: { name: "", address: "" },
  serviceType: "painting",
  startDate: "",
  deadline: "",
  status: "Not started",
  totalAmount: "",
};

const ProjectForm = ({ onSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingProject = location.state?.project || null;

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 


  useEffect(() => {
    if (editingProject) {
      setForm({
        ...editingProject,
        client: {
          name: editingProject.client?.name || "",
          address: editingProject.client?.address || "",
        },
      });
    }
  }, [editingProject]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        client: { ...prev.client, [key]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, form);
        setSuccess(" Project updated successfully");
      } else {
        await api.post("/projects", form);
        setSuccess(" Project created successfully");
      }

      setForm(initialForm);
      if (onSuccess) onSuccess();
      setTimeout(() => setSuccess(""), 3000);
      navigate("/admin");

    } catch (err) {
      console.error("Error saving project:", err);
      setError(err.response?.data?.message || "Error saving project");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg bg-white p-6 rounded shadow space-y-4"
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="self-start mb-6 flex items-center text-blue-600 hover:underline font-medium transition"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">
        {editingProject ? "Edit Project" : "Create New Project"}
      </h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>} 

      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        value={form.projectName}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />

      <input
        type="text"
        name="client.name"
        placeholder="Client Name"
        value={form.client.name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />

      <input
        type="text"
        name="client.address"
        placeholder="Client Address"
        value={form.client.address}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />

      <select
        name="serviceType"
        value={form.serviceType}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      >
        <option value="painting">Painting</option>
        <option value="duco">Duco</option>
        <option value="polish">Polish</option>
        <option value="pu">PU</option>
      </select>

      <label className="block">
        Start Date:
        <input
          type="date"
          name="startDate"
          value={form.startDate?.substring(0, 10) || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded mt-1"
        />
      </label>

      <label className="block">
        Deadline:
        <input
          type="date"
          name="deadline"
          value={form.deadline?.substring(0, 10) || ""}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded mt-1"
        />
      </label>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      >
        <option value="Not started">Not started</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="number"
        name="totalAmount"
        placeholder="Total Amount"
        value={form.totalAmount || ""}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />

      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          {editingProject ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
