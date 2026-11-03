import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Plus, Eye, Pencil, Trash2} from "lucide-react";
import DataTable from "../../components/DataTable/DataTable";
import SearchBar from "../../components/Auth/SearchBar";
import DeleteModal from "../../components/Auth/DeleteModal";
import {getCategories, saveCategories} from "../../services/categoryService";
import ExportButton from "../../components/ExportButton/ExportButton";


function Categories(){
  const [categories, setCategories] = useState([]);
  const [search, setSearch]= useState("");
  const [categoryToDelete, setCategoryToDelete]= useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    setCategories(getCategories());
  },[]);
  const filteredCategories= categories.filter((category)=>[
    category.name, category.slug, category.description, category.status].some((value)=> value.toLowerCase().includes(search.toLowerCase()))
  );
  function handleDeleteClick(categoryId){
    setCategoryToDelete(categoryId);
  }
  function handleConfirmDelete(){
    if(categoryToDelete===null) return;
    const updatedCategories= categories.filter((category)=> category.id!=categoryToDelete);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    setCategoryToDelete(null);
  }
  function handleExport(){
     return console.log("export button clicked");
  }
  //  function handleExport() {
  //   const headers = [
  //     "ID",
  //     "Name",
  //     "Slug",
  //     "Description",
  //     "Products",
  //     "Status",
  //     "Created At",
  //   ];

  //   const escapeCsv = (value) =>
  //     `"${String(value ?? "").replace(/"/g, '""')}"`;

  //   const rows = filteredCategories.map((category) =>
  //     [
  //       category.id,
  //       category.name,
  //       category.slug,
  //       category.description,
  //       category.productCount,
  //       category.status,
  //       category.createdAt,
  //     ]
  //       .map(escapeCsv)
  //       .join(",")
  //   );

  //   const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
  //   const blob = new Blob(["\uFEFF" + csv], {
  //     type: "text/csv;charset=utf-8;",
  //   });

  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");

  //   link.href = url;
  //   link.download = "categories.csv";
  //   link.click();

  //   URL.revokeObjectURL(url);
  // }

  const columns=[
    {
      key:"id",
      label:"ID",
    },
    {
      key:"name",
      label:"Category",
      render:(category)=>(
        <div>
          <p className="font-medium text-slate-900">
            {category.name}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {category.slug}
          </p>
        </div>
      ),
    },
    {
      key:"description",
      label:"Description",
      render:(category)=>(
        <p className="max-w-xs truncate text-slate-600">
          {category.description}
        </p>
      ),
    },
    {
      key:"productCount",
      label:"Products",
    },
    {
      key:"status",
      label:"Status",
      render:(category)=>(
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${category.status ==="Active"? "bg-green-50 text-green-700":"bg-red-50 text-red-600"}`}>{category.status}</span>

      ),
    },
    {
      key:"createdAt",
      label:"Created At",
      render:(category)=> new Date(category.createdAt + "T00:00:00").toLocaleDateString(
        "en-GB",
        {
          day:"2-digit",
          month:"short",
          year:"numeric",
        }
      ),
    },
    {
      key : "actions",
      label: "Actions",
      render: (category)=>(
        <div className="flex items-center gap-3">
          <button type="button" onClick={()=> navigate(`/categories/${category.id}`)} title="View category" className="text-slate-500 transition hover:text-slate-900" ><Eye size={18} /></button>
          <button type="button" onClick={()=> navigate(`/categories/edit/${category.id}`)} title="Edit Category" className="text-slate-500 transition hover:text-slate-900"><Pencil size={18}/></button>
          <button type="button" onClick={()=>{handleDeleteClick(category.id)}} title="Delete category" className="text-slate-500 transition hover:text-red-600"><Trash2 size={18}/></button>
        </div>
      ),
    },
  ];
  return (
    <div className="p-3">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-slate-900"> Categories</h1>
        <p className="mt-1 text-slate-500">Manage your cycling product categories.</p>
      </div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <SearchBar search={search} setSearch={setSearch} placeholder="Search categories"/>
        </div>
        <div className="flex shrink-0 items-center gap-3">
            <ExportButton onExport={handleExport}/>
<button
            type="button"
            onClick={() => navigate("/categories/add")}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus size={18} />
            Add Category
          </button>        </div>
      </div>
      <DataTable columns={columns} data={filteredCategories} />
      {filteredCategories.length=== 0 && (
        <p className="mt-2 text-center text-sm text-slate-500">
          No categories found.
        </p>
      )}
      <DeleteModal isOpen={categoryToDelete !==null} onClose={()=>setCategoryToDelete(null)} onConfirm={handleConfirmDelete} title="Delete Category" message="Are you sure you want to delete this category?"/>
    </div>
  );
}
export default Categories;