import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors,setErrors] = useState({});


  // validations  apply

  const validate =() => {
    const newErrors ={};

    if(!form.email.trim()){
      newErrors.email = " Email is required";
    } else if(!isValidEmail(form.email)){
      newErrors.email = "Invalid email address";
    }
    
  if (!form.password) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;

  }




  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // validations
    setLoading(true);
    const res = await login(form);

    setLoading(false);
    if (res.ok) {
      // navigate("/admin/hotels"); // dashboard
      navigate("/")
    } else {
      alert(res.error?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">Log in to continue</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange}
            error = {errors.email}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={onChange}
            error={errors.password}
          />
          <Button type="submit" className="w-full bg-blue-600 text-white">
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
