import { useState } from 'react';
import axiosClient from '../config/axios';

const useFetchOnSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getClient = (url, verb, values) => {
    let client = null;

    switch (verb) {
      case 'get':
        client = axiosClient.get(url);
        break;

      case 'post':
        client = axiosClient.post(url, values);
        break;

      case 'put':
        client = axiosClient.put(url, values);
        break;

      case 'patch':
        client = axiosClient.patch(url, values);
        break;

      case 'delete':
        client = axiosClient.delete(url);
        break;

      default:
        client = axiosClient.get(url);
        break;
    }
    return client;
  };

  const fetchData = async (url, verb, values) => {
    try {
      setIsLoading(true);
      const response = await getClient(url, verb, values);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleError = () => {
    setError(null);
  };

  return [fetchData, isLoading, error, handleError];
};

export default useFetchOnSubmit;
