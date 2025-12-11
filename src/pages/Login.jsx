import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";


export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const res = await login(form);
    setBusy(false);
    if (res.ok) navigate("/");
    else alert(res.error?.message || "Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">Log in to continue</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
           name="email" 
          label="Email"
           type="email"
            value={form.email} 
            onChange={onChange} />

          <Input
           name="password"
           label="Password"
            type="password"
             value={form.password}
              onChange={onChange} />

          <Button type="submit"
           className="w-full bg-blue-600 text-white">{busy ? "Logging..." : "Login"}</Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">Don't have an account? <Link className="text-blue-600 font-semibold" to="/signup">Sign up</Link></p>
      </div>
    </div>

  );
}
