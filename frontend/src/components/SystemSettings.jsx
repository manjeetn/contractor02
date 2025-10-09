import React from "react";

const SystemSettings = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">System Settings (Admin Only)</h2>
      <p className="text-gray-400">
        <h3 className="text-blue-500 font-semibold text-lg">In Progress</h3>
       Here admin can manage system-level configurations like user roles, logs,
        data cleanup, etc. (future expansion).
      </p>
    </div>
  );
};

export default SystemSettings;
