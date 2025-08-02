import { Instagram } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80", // Cat
  "https://images.unsplash.com/photo-1518715308788-3005759c61e9?auto=format&fit=crop&w=400&q=80", // Dog
  "https://images.unsplash.com/photo-1518715308788-327f6b0037a7?auto=format&fit=crop&w=400&q=80", // Cat
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80", // Dog
  "https://images.unsplash.com/photo-1518715308788-327f6b0037a7?auto=format&fit=crop&w=400&q=80", // Cat
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80", // Dog
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80", // Cat
  "https://images.unsplash.com/photo-1518715308788-3005759c61e9?auto=format&fit=crop&w=400&q=80", // Dog
]

export default function EditorialGrid() {
  return (
    <section className="w-full px-4 py-12">
      <div className="grid grid-cols-4">
        {images.map((src, idx) => (
          <div key={idx} className="relative group w-full aspect-square overflow-hidden">
            <img src={src} alt={`grid-${idx}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Instagram className="text-black w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
