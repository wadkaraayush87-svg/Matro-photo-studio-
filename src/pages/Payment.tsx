import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CreditCard, Upload, CheckCircle, Info } from "lucide-react";

export default function Payment() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    if (!screenshot) return;
    setLoading(true);

    try {
      await fetch(`/api/leads/${leadId}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screenshot })
      });
      
      // Send WhatsApp confirmation
      const waMessage = `*Payment Confirmed*%0A%0AInquiry ID: ${leadId}%0AStatus: ₹9 Booking Fee Paid.`;
      window.open(`https://wa.me/919324236203?text=${waMessage}`, "_blank");
      
      navigate("/success");
    } catch (error) {
      alert("Error confirming payment.");
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
            <CreditCard className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Confirm Booking</h1>
          <p className="text-gray-400">Pay ₹9 to confirm your professional consultation</p>
        </div>

        <div className="space-y-8">
          {/* QR Code Section */}
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center gap-4 max-w-xs mx-auto">
            <img 
              src="https://i.imgur.com/your-qr-placeholder.png" // This would be the admin uploaded QR
              alt="UPI QR Code" 
              className="w-full aspect-square object-contain"
            />
            <div className="text-dark text-center">
              <p className="font-bold text-lg">Scan to Pay</p>
              <p className="text-sm opacity-70">UPI ID: sunilwadkar19730@oksbi</p>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/20 p-4 rounded-xl flex gap-3">
            <Info className="text-gold shrink-0" />
            <p className="text-sm text-gray-300">
              Please pay ₹9 using any UPI app (GPay, PhonePe, Paytm) and upload the screenshot below to confirm your slot.
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-gold flex items-center gap-2">
              <Upload size={16} /> Upload Payment Screenshot
            </label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center group-hover:border-gold/50 transition-all">
                {screenshot ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="text-green-500 w-8 h-8" />
                    <p className="text-sm text-green-500 font-bold">Screenshot Selected</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-gray-500 w-8 h-8" />
                    <p className="text-sm text-gray-400">Click or drag to upload</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={!screenshot || loading}
            className="w-full py-4 rounded-xl gold-gradient text-dark font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
