import { useState, useCallback } from "react";

import axios from "../../axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method, body = null, headers = null) => {
      let response;
      setIsLoading(true);

      try {
        if (method == "GET") {
          response = await axios.get(url);
        } else if (method == "POST") {
          response = await axios.post(url, body);
        }
        setIsLoading(true);
        return response;
      } catch (error) {
        const message = error.response.data.message;
        setError(message);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};