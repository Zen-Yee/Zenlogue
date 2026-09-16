// SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import InputText from "../../../components/ui/InputText/InputText";
import AuthForm from "../AuthForm/AuthForm";

function SignIn() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 || res.status === 409) {
          setWarning(data.message); // show on form
        } else {
          navigate("/error", {
            // unexpected errors → error page
            state: { message: data.message, status: res.status },
          });
        }
        return;
      }

      // After successful register/login
      setUser({
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
      });
    } catch (err) {
      console.error(err);
      navigate("/error", {
        state: { message: "Network error, please try again." },
      });
    }
  };

  return (
    <AuthForm
      title="Welcome Back!"
      footer={
        <p>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </p>
      }
      onSubmit={handleSubmit}
    >
      <InputText
        label="Username :"
        name="username"
        onChange={handleChange}
        value={form.username}
      />
      <InputText
        label="Password :"
        name="password"
        type="password"
        onChange={handleChange}
        value={form.password}
      />
    </AuthForm>
  );
}

export default SignIn;
