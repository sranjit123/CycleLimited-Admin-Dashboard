import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "../../components/Auth/FormInput";
import PasswordInput from "../../components/Auth/PasswordInput";
import CycleImage1 from "../../assets/cycle2.webp";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.password.trim().length < 5) {
      newErrors.password = "Password should be atleast 5 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    console.log("Form is valid", formData);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const email = formData.email.trim().toLowerCase();
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setErrors((previous) => ({
        ...previous,
        email: "An account with this email already exists",
      }));
      return;
    }
    const newUser = {
      //   id: Date.now(),
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      email: email,
      password: formData.password,
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("User registered:", newUser);
    navigate("/login");
  }
  return (
    <AuthLayout
      formTitle="Register / Sign Up"
      sideTitle="Welcome to our cycle shop!"
      sideDescription="Shop the latest gears, cycles and components with ease."
      sideButtonText="Sign In"
      onSideButtonClick={() => navigate("/login")}
      sideImage={CycleImage1}
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          error={errors.name}
        />
        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Sign Up
        </button>
      </form>
      <p className="py-3 text-center text-sm text-slate-500">
        Already have an account? {""}
        <Link
          to="/login"
          className="font-medium text-slate-900 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
export default Register;
