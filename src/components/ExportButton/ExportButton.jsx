import {Download} from "lucide-react";
function ExportButton({onExport}){
    return(
        <button type="button" onClick={onExport} className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"> 
            <Download size={18}></Download>
            Export
        </button>

    );
}
export default ExportButton;