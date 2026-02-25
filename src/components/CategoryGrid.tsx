import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Camera } from "lucide-react";
import { Category } from "../types";

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gold"></div></div>;

  return (
    <section id="categories" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gold font-bold tracking-widest uppercase text-sm mb-4">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">Shoot Categories</h3>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl glass-card h-[400px]"
            >
              <div className="absolute inset-0">
                <img 
                  src={cat.cover_image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="p-3 rounded-xl bg-gold/20 backdrop-blur-md w-fit mb-4">
                  <Camera className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-2xl font-display font-bold mb-2">{cat.name}</h4>
                <p className="text-gray-300 text-sm mb-6 line-clamp-2">{cat.description}</p>
                <Link 
                  to={`/category/${cat.id}`}
                  className="flex items-center gap-2 text-gold font-bold group/btn"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
