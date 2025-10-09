import React, { useState, useEffect } from "react";

const PreferencesSettings = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

   return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      <div className="flex items-center space-x-4">
        <span>Theme:</span>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>
    </div>
  );
};

export default PreferencesSettings;
