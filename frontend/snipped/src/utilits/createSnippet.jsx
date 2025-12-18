import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentBtn from './comment.jsx';
import { Trash2, Plus, FileText } from 'lucide-react';

export default function Form() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const normalizeListResponse = (resData) => {
    if (!resData) return [];
    if (Array.isArray(resData)) return resData;
    if (Array.isArray(resData.snippets)) return resData.snippets;
    if (Array.isArray(resData.Snippets)) return resData.Snippets;
    if (Array.isArray(resData.data)) return resData.data;

    if (resData.Snippet && typeof resData.Snippet === 'object') {
      if (Array.isArray(resData.Snippet)) return resData.Snippet;
      return Object.values(resData.Snippet);
    }

    if (resData.snippet && typeof resData.snippet === 'object') {
      return Array.isArray(resData.snippet) ? resData.snippet : [resData.snippet];
    }

    if (typeof resData === 'object') return Object.values(resData);
    return [];
  };

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/v1/snippet');
      console.log('Fetched snippets:', res.data);
      const list = normalizeListResponse(res.data);
      console.log('Normalized snippet list:', list);
      setSnippets(list);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const createSnippet = async (title, code) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/snippet', { title, code });
      console.log('Snippet created response:', response.data);

      const d = response.data;
      if (!d) return null;

      if (d.Snippet) {
        if (typeof d.Snippet === 'object' && !Array.isArray(d.Snippet)) {
          const vals = Object.values(d.Snippet);
          return vals.length ? vals[0] : null;
        }
        return d.Snippet;
      }
      if (d.snippet) {
        if (typeof d.snippet === 'object' && !Array.isArray(d.snippet)) {
          return d.snippet;
        }
        if (Array.isArray(d.snippet) && d.snippet.length) return d.snippet[0];
      }
      if (d.id || d._id) return d;
      return null;
    } catch (error) {
      console.error('Error creating snippet:', error);
      return null;
    }
  };

  const deleteSnippet = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:8000/api/v1/snippet/${id}`);
      setSnippets(snippets.filter(snippet => (snippet.id || snippet._id || snippet.ID) !== id));
    } catch (error) {
      console.error('Error deleting snippet:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) {
      alert('Please fill in both title and code');
      return;
    }

    setLoading(true);
    const created = await createSnippet(title.trim(), code.trim());

    if (created) {
      setSnippets(prev => [created, ...prev]);
    } else {
      await fetchSnippets();
    }

    setTitle('');
    setCode('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-lin-to-br from-slate-50 via-blue-50 to-indigo-50">
      
       

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-indigo-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <Plus className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Add Details</h2>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-slate-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Comment
                </label>
                <textarea
                  placeholder="Enter Comment"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-slate-50 hover:bg-white"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className={`w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Your Snippets</h3>
          <p className="text-slate-600 text-sm mt-1">Manage all your saved snippets</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {console.log('Rendering snippets:', snippets.length)}
          {snippets.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-lg border border-slate-200 p-16 text-center">
              <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <FileText className="text-slate-400" size={40} />
              </div>
              <p className="text-slate-500 text-lg font-medium">No snippets yet</p>
              <p className="text-slate-400 text-sm mt-2">Create your first snippet to get started</p>
            </div>
          ) : (
            snippets.map((snippet, index) => {
              const id = snippet.id || snippet._id || snippet.ID || index;
              return (
                <div
                  key={id}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h1 className="font-bold text-xl text-slate-800 mb-3 truncate">
                          {snippet.title || snippet.TITLE || 'Untitled'}
                        </h1>
                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                          <pre className="whitespace-pre-wrap text-sm text-slate-700 overflow-auto max-h-32 scrollbar-thin">
                            {snippet.code || snippet.COD || ''}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
                      <CommentBtn snippetId={snippet.id || snippet._id || id} />

                      <button
                        onClick={() => deleteSnippet(id)}
                        disabled={deletingId === id}
                        aria-label={`Delete snippet ${id}`}
                        className={`flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors ${
                          deletingId === id ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <Trash2 size={16} />
                        {deletingId === id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}