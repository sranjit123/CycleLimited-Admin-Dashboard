import React from "react";
import {LoaderCircle} from "lucide-react";
const VARIANTS= {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-300",
  outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
}
const SIZES={
    sm: "px-3 py-1.5 text-xs font-medium",
  md: "px-4 py-2 text-sm font-medium",
  lg: "px-5 py-2.5 text-base font-semibold",
}
function Button({
    children, type="button", variant="primary", size="md", icon:Icon, isLoading= false, disabled=false, className="", onClick, ...props
}){
    return(
        <button type={type} disabled={disabled|| isLoading} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...props}>
            {isLoading? (<LoaderCircle className="h-4 w-4 animate-spin"/>):Icon?(<Icon className="h-4 w-4" />):null}
            <span>{children}</span>
        </button>

    );
}
export default Button;