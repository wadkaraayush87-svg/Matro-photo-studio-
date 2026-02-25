import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, User, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login for demo
    if (username === "admin" && password === "metro123") {
      localStorage.setItem("admin_token", "logged_in");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-3xl font-display font-bold">Admin Login</h1>
          <p className="text-gray-400 text-sm">Secure access to studio management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-2">
              <User size={14} /> Username
            </label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-2">
              <Lock size={14} /> Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full py-4 rounded-xl gold-gradient text-dark font-bold hover:scale-[1.02] transition-all">
            Login to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
