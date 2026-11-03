import {Search} from "lucide-react";
function SearchBar({ search, setSearch, placeholder }) {
  return (
    <div className="w-full">
        <div className="relative">
            <Search
                    size={20}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                    "
                />
             <input
                    type="text"
                    
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                    "
                />
        </div>
     
    </div>
  );
}
export default SearchBar;