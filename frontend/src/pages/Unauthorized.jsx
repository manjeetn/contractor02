
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-gray-400 dark:text-gray-300 mb-6">
         If you want to see  working of settings page please signup or login as labor!
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 dark:text-gray-200 hover:bg-gray-500"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
