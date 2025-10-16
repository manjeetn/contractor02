
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DashboardOverview = () => {
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalProjects: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
  });

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      const projectsArray = Array.isArray(res.data) ? res.data : res.data.projects;
      setProjects(projectsArray || []);

      const total = projectsArray.length;
      const notStarted = projectsArray.filter((p) => p.status === "Not started").length;
      const inProgress = projectsArray.filter((p) => p.status === "In progress").length;
      const completed = projectsArray.filter((p) => p.status === "Completed").length;
      setAnalytics({ totalProjects: total, notStarted, inProgress, completed });
    } catch (err) {
      setProjects([]);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert(" Project deleted successfully");
    } catch (err) {
      console.error(err);
      alert(" Error deleting project");
    }
  };

  const handleEdit = (project) => {
    navigate("/admin/create-project", { state: { project } });
  };

  return (
    <div className="space-y-12">
    <button
    onClick={() => navigate(-1)}
    className="self-start mb-6 flex items-center text-blue-600 hover:underline font-medium transition"
    >
    <ArrowLeft size={20} className="mr-2" /> 
    Back
    </button>      
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Analytics Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded text-center">
            <div className="text-2xl font-bold">{analytics.totalProjects}</div>
            <div>Total Projects</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded text-center">
            <div className="text-2xl font-bold">{analytics.notStarted}</div>
            <div>Not Started</div>
          </div>
          <div className="bg-orange-100 p-4 rounded text-center">
            <div className="text-2xl font-bold">{analytics.inProgress}</div>
            <div>In Progress</div>
          </div>
          <div className="bg-green-100 p-4 rounded text-center">
            <div className="text-2xl font-bold">{analytics.completed}</div>
            <div>Completed</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              let statusColor =
                project.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : project.status === "In progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800";

              return (
                <div
                  key={project._id}
                  className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-800">
                      {project.projectName}
                    </h3>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>
                      <strong>Client:</strong> {project.client?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Service:</strong> {project.serviceType}
                    </p>
                    <p>
                      <strong>Deadline:</strong>{" "}
                      {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardOverview;
