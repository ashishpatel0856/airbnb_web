import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation";

export default function Login() {
  const { login, userRole, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // ===================== Validation =====================
  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===================== Input Change =====================
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setSubmitError("");
  };

  // ===================== Submit =====================
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await login(form);

    if (!res.ok) {
      setSubmitError(res.error?.message || "Invalid email or password");
    }
  };

  // ===================== Role Based Redirect =====================
useEffect(() => {
  if (!userRole || userRole.length === 0) return;

  if (userRole.includes("HOTEL_MANAGER")) {
    navigate("/admin/hotels", { replace: true });
  } else {
    navigate("/", { replace: true });
  }
}, [userRole, navigate]);


  // ===================== UI =====================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Login to manage your bookings
        </p>

        {submitError && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange}
            error={errors.email}
          />

          <Input
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={onChange}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF385C] hover:bg-[#e73550] text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#FF385C] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
