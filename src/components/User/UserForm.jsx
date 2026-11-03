import { useState } from "react";
import FormInput from "../Auth/FormInput";
function UserForm({ initialData, onSubmit, submitLabel = "Add User" }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    username: initialData?.username || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    website: initialData?.website || "",
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
    }));
  }
  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length ===0;
  }
  function handleSubmit(event){
    event.preventDefault();
    if(!validateForm()){
        return;
    }
    onSubmit({
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        website: formData.website.trim(),
    });
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
        <FormInput label="Full Name" name="name"  value={formData.name} onChange={handleChange} placeholder="Enter full name" error={errors.name}/>
        <FormInput
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter username"
        error={errors.username}
      /><FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
        error={errors.email}
      /><FormInput
        label="Phone"
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
        error={errors.phone}
      /><FormInput
        label="Website"
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="Enter website"
        error={errors.website}
      /><div className="flex gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
export default UserForm;