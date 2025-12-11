import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Lock } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const res = await signup(form);
    setBusy(false);
    if (res.ok) navigate("/login");
    else alert(res.error?.message || "Signup failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 mb-6">Join and start booking great stays</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input label="Full name" name="name" value={form.name} onChange={onChange} icon={User} />
          <Input label="Email" name="email" value={form.email} onChange={onChange} icon={Mail} />
          <Input label="Password" name="password" value={form.password} onChange={onChange} type="password" icon={Lock} />
          <Button type="submit" className="w-full bg-red-500 text-white">{busy ? "Creating..." : "Sign up"}</Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">Already have an account? <Link className="text-red-500 font-semibold" to="/login">Login</Link></p>
      </div>
    </div>
  );
}
