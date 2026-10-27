import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function usePosts({ page = 1, limit = 10, search = "" } = {}) {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts`, {
          params: { offset: (page - 1) * limit, limit, search },
        });
        setPosts(response.data.data);
        setTotal(response.total);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllPost();
  }, [page, limit, search]);

  return { posts, total, error };
}

export default usePosts;
