import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, Clock, Image as ImageIcon, MapPin, ArrowLeft } from "lucide-react";
import { Category } from "../types";

export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        setCategory(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold"></div></div>;
  if (!category) return <div className="h-screen flex items-center justify-center">Category not found</div>;

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-[50vh]">
        <img 
          src={category.cover_image} 
          alt={category.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 text-center">
          <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4"
          >
            {category.name}
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl px-4">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        {/* Pricing Packages */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Package Pricing</h2>
            <p className="text-gray-400">Choose the perfect plan for your special moments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {category.packages?.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 flex flex-col ${i === 1 ? "border-gold/50 ring-1 ring-gold/20 scale-105" : ""}`}
              >
                {i === 1 && <div className="bg-gold text-dark text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-6 mx-auto">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-display font-bold text-gold mb-6">₹{pkg.price.toLocaleString()}</div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <Clock className="w-4 h-4 text-gold" /> {pkg.duration}
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <ImageIcon className="w-4 h-4 text-gold" /> {pkg.photos_count} Edited Photos
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-gold mt-1 shrink-0" /> {pkg.details}
                  </li>
                </ul>

                <Link 
                  to={`/inquiry?category=${encodeURIComponent(category.name)}&package=${encodeURIComponent(pkg.name)}`}
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                    i === 1 ? "gold-gradient text-dark hover:scale-105" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Suggested Photos</h2>
            <p className="text-gray-400">Sample poses and styling examples for your {category.name}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <motion.div
                key={n}
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] rounded-xl overflow-hidden glass-card group cursor-zoom-in"
              >
                <img 
                  src={`https://ais-pre-2c4earadwjfghjos3ji4vt-341207827133.asia-southeast1.run.app/api/images/${n}`} 
                  alt="Sample" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
