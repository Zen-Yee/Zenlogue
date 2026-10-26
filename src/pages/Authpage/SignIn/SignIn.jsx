import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import InputText from "../../../components/ui/InputText/InputText";
import Spinner from "../../../components/ui/Spinner/Spinner";
import AuthForm from "../AuthForm/AuthForm";

function SignIn() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

    const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload


    if (!form.username || !form.password) {
      setWarning("Please provide valid credentials");
      return;
    }


    setLoading(true);
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 400 || res.status === 409) {
        setWarning(data.message); // show on form
        setTimeout(() => {
        setLoading(false);
        }, 2000);
      } else {
        navigate("/error", {
          state: { message: data.message, status: res.status },
        });
      }
      return;
    }

    setUser({
      id: data.user.id,
      username: data.user.username,
      role: data.user.role,
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    navigate("/");
  };

  return (
    <>
     {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
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

       <p className="warning">{warning}</p>

    </AuthForm>
  )}</>
  );
}

export default SignIn;
