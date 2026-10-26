import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function usePost(id) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${id}`);
        setPost(response.data.postData);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [id]);

  return { post, error };
}

export default usePost;
