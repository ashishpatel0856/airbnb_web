import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Lock, Gem, Calendar, Shield } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { isStrongPassword, isValidEmail } from "../utils/validation";

export default function Signup() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    roles: "",
    dateOfBirth: "",
  });

  // validations
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (!isStrongPassword(form.password))
      newErrors.password = "Password must be at least 8 characters";

    if (!form.gender.trim()) newErrors.gender = "Gender is required";

    if (!form.roles) newErrors.roles = "Please select a role";

    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  
  const onSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  if (loading) return;

  setLoading(true);
  try {
    // convert role string to array
    const rolesArray = [form.roles];
    const res = await signup({ ...form, roles: rolesArray });

    if (res.ok) navigate("/login");
    else alert(res.error?.message || "Signup failed");
  } catch (err) {
    alert("Signup failed");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Join and start booking great stays
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={onChange}
            icon={User}
            error={errors.name}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={onChange}
            icon={Mail}
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            icon={Lock}
            error={errors.password}
          />

          <Input
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={onChange}
            type="text"
            icon={Gem}
            error={errors.gender}
          />

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
                name="roles"
                value={form.roles}
                onChange={onChange}
                className="w-full pl-10 pr-3 py-3 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              >
                <option value="">Select role</option>
                <option value="GUEST">Guest</option>
                <option value="USER">USER</option>
                <option value="HOTEL_MANAGER">Hotel Manager</option>
              </select>
            </div>
            {errors.roles && (
              <p className="text-xs text-red-500 mt-1">{errors.roles}</p>
            )}
          </div>

          <Input
            label="Date of birth"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={onChange}
            type="date"
            icon={Calendar}
            error={errors.dateOfBirth}
          />

          <Button type="submit" className="w-full bg-red-500 text-white">
            {loading ? "Creating..." : "Sign up"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-red-500 font-semibold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
