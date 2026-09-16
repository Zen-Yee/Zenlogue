// Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import InputText from "../../../components/ui/InputText/InputText";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "confirmPassword" || name === "password") {
        setWarning(
          updated.confirmPassword !== updated.password
            ? "Password does not match"
            : ""
        );
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    if (form.password !== form.confirmPassword) {
      setWarning("Password does not match");
      return;
    }

    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      credentials: "include", // ← this is required for cookies to be set
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 400 || res.status === 409) {
        setWarning(data.message);
      } else {
        navigate("/error", {
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

    navigate("/");
  };

  return (
    <AuthForm
      title="Join Us!"
      footer={
        <p>
          Already have an account? <Link to="/auth/signin">Sign In</Link>
        </p>
      }
      onSubmit={handleSubmit}
    >
      <InputText
        label="Username :"
        name="username"
        type="text"
        onChange={handleChange}
        value={form.username}
      />
      <InputText
        label="Email :"
        name="email"
        type="email"
        onChange={handleChange}
        value={form.email}
      />
      <InputText
        label="Password :"
        name="password"
        type="password"
        onChange={handleChange}
        value={form.password}
      />
      <InputText
        label="Confirm Password :"
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        value={form.confirmPassword}
      />

      <p className="warning">{warning}</p>
    </AuthForm>
  );
}

export default Register;
