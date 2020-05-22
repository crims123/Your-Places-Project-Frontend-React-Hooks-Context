import { useState, useEffect } from 'react';
import axiosClient from '../config/axios';

const useFetch = (url, verb, values) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await client;
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data.message);
      }
    };
    fetch();
  }, []);

  const handleError = () => {
    setError(null);
  };

  return [data, isLoading, error, handleError, setData];
};

export default useFetch;
