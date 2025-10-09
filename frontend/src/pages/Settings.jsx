
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts.jsx";

import AccountSettings from "../components/AccountSettings.jsx";
import PreferencesSettings from "../components/preferenceSettings.jsx";
import SecuritySettings from "../components/SecuritySettings.jsx";
import SystemSettings from "../components/SystemSettings.jsx";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { key: "account", label: "Account" },
    { key: "preferences", label: "Preferences" },
    { key: "security", label: "Security" },
  ];

  if (user?.role === "admin") {
    tabs.push({ key: "system", label: "System" });
  }

  return (
    <div className=" mt-5 mx-5 bg-white dark:bg-gray-900 shadow rounded-lg p-6 text-gray-900 dark:text-gray-100">
     
      <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`pb-2 text-lg font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

    
      {activeTab === "account" && <AccountSettings />}
      {activeTab === "preferences" && <PreferencesSettings />}
      {activeTab === "security" && <SecuritySettings />}
      {activeTab === "system" && user?.role === "admin" && <SystemSettings />}
    </div>
  );
};

export default Settings;
