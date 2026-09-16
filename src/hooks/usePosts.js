import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function usePosts({ limit = 10, offset = 0 } = {}) {
  const page = 1;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();

  const fetchAllPost = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/posts?offset=${offset}&limit=${limit}`
      );
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const offset = (page - 1) * limit;
    fetchAllPost(offset);
  }, [page, limit]);

  return { posts };
}

export default usePosts;
