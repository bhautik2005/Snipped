import { FileText } from "lucide-react";

export default function SimpleNavbar() {
  return (
    <nav className="w-full bg-white shadow p-4 flex items-center justify-between">
       
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg">
              <FileText className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Snippet Manager</h1>
              <p className="text-slate-600 text-sm">Create and manage your code snippets</p>
            </div>
          </div>
        </div>
      </div>
      
       
      
      <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700">
        Sign In
      </button>

    </nav>
  );
}
