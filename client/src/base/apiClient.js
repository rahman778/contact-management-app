import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE,
});

// Intercept response errors
apiClient.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    // Handle validation errors
    if (error.response && error.response.status === 400) {
      const errorData = error.response.data;

      // If validation errors are present
      if (Array.isArray(errorData.message)) {
        errorData.message.forEach((error) => {
          toast.error(`${error.property}: ${error.errors?.join(", ")}`);
        });
      } else {
        // Generic error message
        toast.error(errorData.message || "An error occurred.");
      }
    } else {
      // Other errors (e.g., network errors)
      toast.error("Something went wrong. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
