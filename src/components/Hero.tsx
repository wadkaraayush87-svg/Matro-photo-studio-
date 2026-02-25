import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Camera, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Capture Your Precious Moments Forever",
    subtitle: "Premium Photography for Life's Greatest Milestones",
    image: "https://picsum.photos/seed/studio1/1920/1080",
    type: "promo"
  },
  {
    title: "Cinematic Wedding Highlights",
    subtitle: "Relive your special day with our artistic touch",
    image: "https://picsum.photos/seed/wedding1/1920/1080",
    type: "featured"
  },
  {
    title: "Adorable Baby Portraits",
    subtitle: "Preserving the innocence of your little ones",
    image: "https://picsum.photos/seed/baby1/1920/1080",
    type: "featured"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-dark z-10" />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
        <motion.div
          key={`content-${current}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            {slides[current].title.split(" ").map((word, i) => (
              <span key={i} className={i % 3 === 0 ? "text-gold" : ""}>{word} </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            {slides[current].subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link 
              to="/inquiry" 
              className="px-8 py-4 rounded-full gold-gradient text-dark font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-gold/20"
            >
              Book Consultation
            </Link>
            <Link 
              to="/#categories" 
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-bold text-lg hover:bg-white/20 transition-all"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-gold w-8" : "bg-white/30"}`}
          />
        ))}
      </div>

      <button 
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-gold hover:text-dark transition-all hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-gold hover:text-dark transition-all hidden md:block"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  );
}
