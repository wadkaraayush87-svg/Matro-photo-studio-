import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";

export default function ZoomScheduling() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ];

  const handleSchedule = async () => {
    if (!date || !time) return;
    setLoading(true);

    try {
      await fetch(`/api/leads/${leadId}/zoom`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time })
      });
      navigate(`/payment/${leadId}`);
    } catch (error) {
      alert("Error scheduling meeting.");
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
            <Video className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Schedule Consultation</h1>
          <p className="text-gray-400">Choose a convenient time for your Zoom meeting</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gold flex items-center gap-2">
              <Calendar size={16} /> Select Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-gold flex items-center gap-2">
              <Clock size={16} /> Select Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`py-3 rounded-xl border transition-all text-sm font-medium ${
                    time === slot 
                      ? "bg-gold text-dark border-gold" 
                      : "bg-white/5 border-white/10 hover:border-gold/50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSchedule}
            disabled={!date || !time || loading}
            className="w-full py-4 rounded-xl gold-gradient text-dark font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
          >
            {loading ? "Scheduling..." : <>Confirm & Proceed to Payment <ArrowRight size={20} /></>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
