import { motion } from "motion/react";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="py-24 max-w-3xl mx-auto px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-12"
      >
        <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-5xl font-display font-bold mb-6">Booking Confirmed!</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto">
          Your professional consultation has been scheduled. We've sent the details to your WhatsApp.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 flex items-center justify-center gap-4">
          <Calendar className="text-gold" />
          <div className="text-left">
            <p className="text-sm text-gray-400">Next Step</p>
            <p className="font-bold">Check your WhatsApp for the Zoom link</p>
          </div>
        </div>

        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-gold font-bold hover:gap-4 transition-all"
        >
          Back to Home <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
}
