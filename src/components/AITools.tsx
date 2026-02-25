import { useState } from "react";
import { motion } from "motion/react";
import { Image as ImageIcon, Sparkles, MapPin, Search, Loader2 } from "lucide-react";
import { generateStudioImage } from "../services/gemini";

export default function AITools() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const img = await generateStudioImage(prompt, size);
      setGeneratedImage(img);
    } catch (error) {
      alert("Error generating image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-dark-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-bold tracking-widest uppercase text-sm mb-4">AI Studio</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">Creative Tools</h3>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Maps Grounding */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-gold" />
              <h4 className="text-2xl md:text-3xl font-display font-bold">Location Scout</h4>
            </div>
            <p className="text-gray-400 text-sm md:text-base mb-8">
              Find the best photography locations in Maharashtra. Powered by Google Maps for real-time accuracy.
            </p>

            <div className="space-y-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for scenic spots, gardens, or heritage sites..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-gold uppercase tracking-widest">Popular Spots</h5>
                  {[
                    { name: "Gateway of India", type: "Heritage", rating: 4.8 },
                    { name: "Lonavala Lake", type: "Nature", rating: 4.6 },
                    { name: "Mahabaleshwar Points", type: "Scenic", rating: 4.9 },
                    { name: "Marine Drive", type: "Urban", rating: 4.7 }
                  ].map((spot, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                      <div>
                        <p className="font-bold">{spot.name}</p>
                        <p className="text-xs text-gray-500">{spot.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gold text-sm font-bold">
                        {spot.rating} ★
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-full min-h-[250px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-sm italic">
                  Interactive Map Loading...
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
