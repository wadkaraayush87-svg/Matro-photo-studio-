import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Send, User, Mail, Phone, MessageSquare, Camera } from "lucide-react";

export default function InquiryForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    category: searchParams.get("category") || "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      // WhatsApp Integration (Click-to-chat)
      const waMessage = `*New Inquiry from Metro Studio*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*WhatsApp:* ${formData.whatsapp}%0A*Category:* ${formData.category}%0A*Message:* ${formData.message}`;
      const waUrl = `https://wa.me/919324236203?text=${waMessage}`;
      
      // We'll open WhatsApp in a new tab but also navigate the user
      window.open(waUrl, "_blank");
      navigate(`/zoom/${data.id}`);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Inquiry Form</h1>
          <p className="text-gray-400">Tell us about your dream photoshoot</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gold flex items-center gap-2">
                <User size={16} /> Full Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gold flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gold flex items-center gap-2">
                <Phone size={16} /> Mobile Number
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
                placeholder="98765 43210"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gold flex items-center gap-2">
                <MessageSquare size={16} /> WhatsApp Number
              </label>
              <input
                required
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
                placeholder="Same as mobile?"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gold flex items-center gap-2">
              <Camera size={16} /> Shoot Category
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all appearance-none"
            >
              <option value="" disabled className="bg-dark">Select a category</option>
              <option value="Baby Shoot" className="bg-dark">Baby Shoot</option>
              <option value="Wedding Shoot" className="bg-dark">Wedding Shoot</option>
              <option value="Pre-Wedding Shoot" className="bg-dark">Pre-Wedding Shoot</option>
              <option value="Mehendi Shoot" className="bg-dark">Mehendi Shoot</option>
              <option value="Haldi Shoot" className="bg-dark">Haldi Shoot</option>
              <option value="Maternity Shoot" className="bg-dark">Maternity Shoot</option>
              <option value="Engagement Shoot" className="bg-dark">Engagement Shoot</option>
              <option value="Birthday Shoot" className="bg-dark">Birthday Shoot</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gold flex items-center gap-2">
              <MessageSquare size={16} /> Your Message
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
              placeholder="Any specific requests or questions?"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 rounded-xl gold-gradient text-dark font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Submitting..." : <>Submit Inquiry <Send size={20} /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
