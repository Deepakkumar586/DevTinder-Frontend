import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/create/Group`, formData, {
        withCredentials: true,
      });

      toast.success(response.data.message);
      navigate("/listGroup");
      setFormData({ name: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
        Create a New Group
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-200 p-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Group Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter group name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a brief description"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white font-semibold rounded ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
