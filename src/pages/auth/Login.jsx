import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "../../components/Auth/FormInput";
import PasswordInput from "../../components/Auth/PasswordInput";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import CycleImage from "../../assets/cycle3.png";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setErrors((previous) => ({
      ...previous,
      [name]: "",
      login:"",
    }));
  }
  function validateForm() {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const email = formData.email.trim().toLowerCase();
    const user = users.find(
      (user) => user.email.toLowerCase() === email && user.password === formData.password,
    );
    if (!user) {
      setErrors({
        login: "Invalid email or password",
      });
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate('/');
  }
  return (
    <AuthLayout
      formTitle="Log In / Sign In"
      sideTitle="Warm Welcome !!!"
      sideDescription="To keep connected with us, please login with your personal info"
      sideButtonText="Sign Up"
      onSideButtonClick={() => navigate("/register")}
      sideImage={CycleImage}
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        ></PasswordInput>
        {errors.login && (
            <p className="text-sm text-red-500">
                {errors.login}
            </p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Sign In
        </button>
      </form>
      <p className="py-3 text-center text-sm text-slate-500">
        Don't have an account? {""}
        <Link
          to="/register"
          className="font-medium text-slate-900 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
export default Login;
