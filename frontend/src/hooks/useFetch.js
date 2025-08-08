import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(url, { params })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;