import { Link } from "react-router-dom";
import { Camera, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-soft border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-gold" />
              <span className="text-xl font-display font-bold">Metro Studio</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Capturing your precious moments with elegance and emotion. Maharashtra's premier photography studio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-dark transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-dark transition-all"><Facebook size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-dark transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/inquiry" className="hover:text-white transition-colors">Book a Shoot</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm">Metro Photo Studio, Main Road, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm">+91 9324236203</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm">info@metrostudio.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/Quick Inquiry */}
          <div>
            <h4 className="text-gold font-bold mb-6">Quick Inquiry</h4>
            <form className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none text-sm"
              />
              <input 
                type="tel" 
                placeholder="WhatsApp Number" 
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-gold outline-none text-sm"
              />
              <button className="w-full py-2 rounded-lg gold-gradient text-dark font-bold text-sm hover:opacity-90 transition-opacity">
                Get Callback
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Metro Photo Studio. All rights reserved. Designed for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
