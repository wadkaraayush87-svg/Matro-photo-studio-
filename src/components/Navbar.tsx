import { Link } from "react-router-dom";
import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gold group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-dark" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Metro <span className="text-gold">Photo Studio</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <Link to="/#categories" className="hover:text-gold transition-colors">Categories</Link>
            <Link to="/#reviews" className="hover:text-gold transition-colors">Reviews</Link>
            <Link to="/admin/login" className="hover:text-gold transition-colors">Admin</Link>
            <Link to="/inquiry" className="px-6 py-2 rounded-full gold-gradient text-dark font-semibold hover:scale-105 transition-transform">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-soft border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" className="block py-2 hover:text-gold" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/#categories" className="block py-2 hover:text-gold" onClick={() => setIsOpen(false)}>Categories</Link>
              <Link to="/#reviews" className="block py-2 hover:text-gold" onClick={() => setIsOpen(false)}>Reviews</Link>
              <Link to="/admin/login" className="block py-2 hover:text-gold" onClick={() => setIsOpen(false)}>Admin</Link>
              <Link to="/inquiry" className="block py-3 text-center rounded-xl gold-gradient text-dark font-bold" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
