import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import AITools from "../components/AITools";
import { motion } from "motion/react";
import { Star, Quote, MapPin, CheckCircle, Camera } from "lucide-react";

const reviews = [
  {
    id: 1,
    author: "Priya Sharma",
    rating: 5,
    comment: "Metro Studio captured our wedding so beautifully. Every emotion was perfectly preserved. Highly recommended!",
    image: "https://i.pravatar.cc/150?u=priya"
  },
  {
    id: 2,
    author: "Rahul Deshmukh",
    rating: 5,
    comment: "The baby shoot was a wonderful experience. They were so patient with our little one. The photos are magical.",
    image: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    id: 3,
    author: "Anjali Patil",
    rating: 5,
    comment: "Professional, creative, and very friendly. They made our pre-wedding shoot feel like a movie set!",
    image: "https://i.pravatar.cc/150?u=anjali"
  }
];

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      
      <CategoryGrid />

      <AITools />

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gold font-bold tracking-widest uppercase text-sm mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Client Stories</h3>
            <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 relative"
              >
                <Quote className="absolute top-6 right-8 w-12 h-12 text-gold/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.author} className="w-12 h-12 rounded-full border-2 border-gold/30" />
                  <div>
                    <h4 className="font-bold text-white">{review.author}</h4>
                    <p className="text-xs text-gold">Verified Client</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-gold" />
              </div>
              <h4 className="text-xl font-bold">10+ Years</h4>
              <p className="text-gray-400 text-sm">Professional Experience</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-gold" />
              </div>
              <h4 className="text-xl font-bold">500+ Shoots</h4>
              <p className="text-gray-400 text-sm">Happy Clients Served</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-gold" />
              </div>
              <h4 className="text-xl font-bold">Maharashtra</h4>
              <p className="text-gray-400 text-sm">Based in the Heart of India</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-gold" />
              </div>
              <h4 className="text-xl font-bold">4K Quality</h4>
              <p className="text-gray-400 text-sm">High-End Equipment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
