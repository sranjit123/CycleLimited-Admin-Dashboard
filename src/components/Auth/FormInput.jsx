function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className=" block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-slate-900"
        }`}
      />
      {error && (
        <p  className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
export default FormInput;