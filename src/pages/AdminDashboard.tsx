import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  LayoutDashboard, Users, Image as ImageIcon, Settings, 
  LogOut, Filter, Download, CheckCircle, Clock, Search,
  Plus, Edit, Trash2, Sparkles
} from "lucide-react";
import { Lead, Category } from "../types";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"leads" | "categories" | "gallery" | "settings">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("admin_token") !== "logged_in") {
      navigate("/admin/login");
    }

    const fetchData = async () => {
      const [leadsRes, catsRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/categories")
      ]);
      setLeads(await leadsRes.json());
      setCategories(await catsRes.json());
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold"></div></div>;

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-dark-soft flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-display font-bold text-gold">Admin Panel</h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "leads" ? "bg-gold text-dark font-bold" : "hover:bg-white/5 text-gray-400"}`}
          >
            <Users size={20} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab("categories")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "categories" ? "bg-gold text-dark font-bold" : "hover:bg-white/5 text-gray-400"}`}
          >
            <LayoutDashboard size={20} /> Categories
          </button>
          <button 
            onClick={() => setActiveTab("gallery")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "gallery" ? "bg-gold text-dark font-bold" : "hover:bg-white/5 text-gray-400"}`}
          >
            <ImageIcon size={20} /> Gallery
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "settings" ? "bg-gold text-dark font-bold" : "hover:bg-white/5 text-gray-400"}`}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === "leads" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold">Inquiry Leads</h2>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10">
                    <Filter size={16} /> Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-dark font-bold text-sm hover:opacity-90">
                    <Download size={16} /> Export CSV
                  </button>
                </div>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gold">Client</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gold">Shoot Type</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gold">Zoom Slot</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gold">Payment</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gold">Status</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-widest text-gold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold">{lead.name}</div>
                          <div className="text-xs text-gray-500">{lead.phone}</div>
                        </td>
                        <td className="p-4 text-sm">{lead.category}</td>
                        <td className="p-4 text-sm">
                          {lead.zoom_date ? (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-gold" />
                              {lead.zoom_date} at {lead.zoom_time}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">Not scheduled</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            lead.payment_status === "Paid" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                          }`}>
                            {lead.payment_status}
                          </span>
                        </td>
                        <td className="p-4">
                          <select 
                            className="bg-transparent text-sm outline-none border-none focus:ring-0 cursor-pointer"
                            defaultValue={lead.status}
                          >
                            <option value="New" className="bg-dark">New</option>
                            <option value="Contacted" className="bg-dark">Contacted</option>
                            <option value="Converted" className="bg-dark">Converted</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <button className="p-2 hover:text-gold transition-colors"><Edit size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold">Manage Categories</h2>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-dark font-bold">
                  <Plus size={20} /> Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="glass-card overflow-hidden group">
                    <div className="h-40 relative">
                      <img src={cat.cover_image} alt={cat.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button className="p-3 rounded-full bg-white text-dark hover:bg-gold transition-colors"><Edit size={20} /></button>
                        <button className="p-3 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={20} /></button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{cat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-display font-bold">Photo Gallery & AI Analysis</h2>
                <div className="flex gap-4">
                   <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10">
                    <Plus size={20} /> Upload Media
                  </button>
                </div>
              </div>

              {/* Video Analysis Section */}
              <div className="glass-card p-8 bg-gold/5 border-gold/20">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-gold" />
                  <h3 className="text-xl font-bold">AI Video Understanding</h3>
                </div>
                <p className="text-sm text-gray-400 mb-6">
                  Upload a client's video to analyze key moments, lighting quality, and emotional highlights using Gemini Pro.
                </p>
                <div className="flex gap-4">
                  <div className="flex-grow border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-gold/50 transition-all cursor-pointer">
                    <p className="text-sm text-gray-500">Drag and drop video file here or click to browse</p>
                  </div>
                  <button className="px-8 rounded-xl gold-gradient text-dark font-bold">
                    Analyze Video
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="aspect-square rounded-xl overflow-hidden glass-card group relative">
                    <img src={`https://picsum.photos/seed/gallery${n}/400/400`} alt="Gallery" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button className="p-2 rounded-lg bg-white text-dark"><Edit size={16} /></button>
                       <button className="p-2 rounded-lg bg-white text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold">Studio Settings</h2>
              <div className="glass-card p-8 max-w-2xl space-y-8">
                <div className="space-y-4">
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xs">Payment Settings</h3>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Booking Fee (₹)</label>
                    <input type="number" defaultValue="9" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">UPI QR Code</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
                      <Plus className="mx-auto mb-2 text-gray-500" />
                      <p className="text-xs text-gray-500">Click to upload new QR code</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gold font-bold uppercase tracking-widest text-xs">Contact Settings</h3>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">WhatsApp Number</label>
                    <input type="text" defaultValue="9324236203" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none" />
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl gold-gradient text-dark font-bold">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
