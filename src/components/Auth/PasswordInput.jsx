import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label = "Password",
  name,
  value,
  onChange,
  placeholder = "Enter your password",
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border pl-4 pr-12 py-3 text-sm outline-none transition ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-slate-900"
          }`}
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-700"
        >
          {/* 2. Swap the raw SVGs for the clean Lucide components */}
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}





// function PasswordInput({
//   label = "Password",
//   name,
//   value,
//   onChange,
//   placeholder = "Enter your password",
//   error,
// }) {
//   return (
//     <div className="space-y-1">
//       <label
//         htmlFor={name}
//         className=" block text-sm font-medium text-slate-700"
//       >
//         {label}
//       </label>
//       <input
//         type="password"
//         name={name}
//         id={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
//           error
//             ? "border-red-500 focus:border-red-500"
//             : "border-slate-300 focus:border-slate-900"
//         }`}
//       />
//       {error && <p className=" text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }
export default PasswordInput;
