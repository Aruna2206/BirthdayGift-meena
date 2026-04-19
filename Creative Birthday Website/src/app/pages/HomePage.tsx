import { motion } from 'motion/react';
import { Heart, Sparkles, Cake, Calendar, PartyPopper, Camera, Star, Music, Image as ImageIcon, Crown, Zap } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

import { useState, useEffect } from 'react';

import { fetchImagesByPage, Photo } from '../../services/api';
import { API_BASE_URL } from '../../services/config';

export function HomePage() {
  const [images, setImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all images for various categories
    fetchImagesByPage('all')
      .then((data: Photo[]) => {
        setImages(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load home images", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { 
      id: 'gifted', 
      title: 'Gifted from Him', 
      filter: (p: Photo) => p.category === 'Gifted from Him', 
      color: 'from-pink-500 to-rose-500',
      icon: PartyPopper
    },
    { 
      id: 'make_day', 
      title: 'Make my day', 
      filter: (p: Photo) => p.category === 'Make my day', 
      color: 'from-pink-500 to-rose-500',
      icon: Sparkles
    },
    { 
      id: 'memories', 
      title: 'Good Memories of my life', 
      filter: (p: Photo) => p.category === 'Good Memories of my life', 
      color: 'from-pink-500 to-rose-500',
      icon: Heart
    },
    { 
      id: 'temple', 
      title: 'Temple Visits', 
      filter: (p: Photo) => p.title.toLowerCase().includes('temple') || p.category === 'Temple Visits', 
      color: 'from-pink-500 to-amber-500',
      icon: Crown
    },
    { 
      id: 'justtry', 
      title: 'Just Try', 
      filter: (p: Photo) => p.category === 'justtry' || p.title.toLowerCase().includes('justtry'), 
      color: 'from-pink-500 to-indigo-500',
      icon: Zap
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-white to-white relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`music-${i}`}
            className="absolute text-pink-500/30"
            initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000, rotate: 0 }}
            animate={{
              y: -150,
              x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 100}px)`,
              rotate: [0, 180, 360],
            }}
            transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          >
            <Music size={Math.random() * 30 + 15} fill="currentColor" />
          </motion.div>
        ))}
        {/* Giant glowing background heart */}
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={800} fill="currentColor" className="text-white" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block mb-6"
        >
          <PartyPopper className="text-pink-500" size={64} />
        </motion.div>

        <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent leading-tight inline-block relative drop-shadow-sm">
          Happy Birthday di Pattani Kunju! 🎉
        </h2>

        <p className="text-2xl md:text-3xl text-pink-500/80 mb-8 font-medium italic">
          "Every memory with you is a gift..."
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl shadow-xl"
          >
            <Cake size={32} />
            <div className="text-left font-bold text-lg">April 23rd🎂</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl shadow-xl"
          >
            <Calendar size={32} />
            <div className="text-left font-bold text-lg">Forever Together 💕</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Special Highlights Section */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-8 flex items-center gap-3 text-pink-500 drop-shadow-sm"
        >
          <Camera className="text-pink-500" size={40} />
          Your Special Memories
        </motion.h3>

        {loading ? (
          <div className="flex justify-center p-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
               <Heart className="text-pink-500" size={64} />
            </motion.div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {categories.map((category, idx) => {
              const categoryImages = images.filter(category.filter);
              
              if (categoryImages.length === 0) return null;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl overflow-hidden group"
                >
                  <div className={`bg-gradient-to-br ${category.color} p-6 text-white flex justify-between items-center`}>
                    <div>
                      <h4 className="text-2xl font-bold mb-1 flex items-center gap-2">
                        <category.icon size={24} />
                        {category.title}
                      </h4>
                      <p className="text-sm opacity-90">{categoryImages.length} moments</p>
                    </div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                       <Star size={24} fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50/50">
                    {categoryImages.slice(0, 8).map((img, i) => (
                      <div key={img.id} className="aspect-square relative overflow-hidden rounded-xl shadow-sm border border-white/50">
                        <ImageWithFallback
                          src={`${API_BASE_URL}${img.url}`}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                    {/* Placeholder and padding if fewer than 8 images */}
                    {categoryImages.length < 4 && [...Array(4 - categoryImages.length)].map((_, i) => (
                       <div key={`empty-${i}`} className="aspect-square bg-pink-100/50 rounded-xl flex items-center justify-center border border-dashed border-pink-200">
                          <ImageIcon className="text-white" size={24} />
                       </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-white/50 flex justify-center">
                      <p className="text-pink-500 font-bold text-sm tracking-widest uppercase">✨ Pure Happiness ✨</p>
                  </div>
                </motion.div>
              );
            })}
            
            {/* If NO special categories exist show a general section */}
            {images.filter(p => !p.category && !p.is_favorite).length > 0 && (
                 <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl overflow-hidden group md:col-span-2"
                 >
                    <div className="bg-gradient-to-r from-rose-100 to-rose-600 p-6 text-rose-600">
                        <h4 className="text-2xl font-bold">More Beautiful Moments</h4>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 p-4">
                        {images.filter(p => !p.category && !p.is_favorite).slice(0, 16).map(img => (
                            <div key={img.id} className="aspect-square rounded-lg overflow-hidden border border-white/50">
                                <ImageWithFallback src={`${API_BASE_URL}${img.url}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                 </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Featured Love Messages */}
      <div className="grid md:grid-cols-2 gap-8 mb-20 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ scale: 1.03, rotate: 1 }}
          className="bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 p-8 md:p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden h-full flex flex-col"
        >
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10 flex-1 flex flex-col">
            <Heart size={36} fill="currentColor" className="text-white mb-4 shrink-0" />
            <h3 className="text-3xl font-bold mb-4 shrink-0 gap-2 text-white flex items-center">
               To My Dearest
            </h3>
            <p className="leading-relaxed whitespace-pre-line flex-1 text-white text-lg">
{`Happy Birthday da ❤️
When I say 6 years, it may sound like just a number… but for me, it’s a lifetime of memories 🥺
All the laughter, happiness, and even our little fights… everything is so precious to me 💞

The day you came into my life, I felt complete 😌
I wish to be with you for many more years…

Love you so much ❤️ Always yours 💋`}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ scale: 1.03, rotate: -1 }}
          className="bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 p-8 md:p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden h-full flex flex-col"
        >
          <motion.div
            className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.4, 1], x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative z-10 flex-1 flex flex-col">
            <PartyPopper size={36} className="mb-4 shrink-0" />
            <h3 className="text-3xl font-bold mb-4 shrink-0">Forever Yours</h3>
            <p className="leading-relaxed whitespace-pre-line flex-1 text-lg">
{`Happy Birthday my love ❤️

6 years… it’s not just time, it’s my whole heart living with you 🥺
Every moment with you became a memory I hold so close to my soul…
Even our smallest fights, our silence, our laughter… everything means the world to me 💞

There were times I was broken, confused, and lost… but you stayed. You chose me again and again 😭
That’s something I can never explain in words… only feel it in my heart.

I don’t know what I did to deserve you… but losing you is something I can’t even imagine 💔
You are not just my love… you are my home, my peace, my entire life 😔

If I ever hurt you, I’m really sorry… because your tears would break me more than anything 😢
All I want in this life is to hold your hand and never let go… no matter what comes.

I love you more than I can ever express ❤️
Please stay with me… always 💋`}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-rose-300 relative overflow-hidden h-full flex flex-col md:col-span-2"
        >
          <motion.div
            className="absolute -top-10 -right-10 w-48 h-48 bg-rose-200 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-200 rounded-full blur-3xl"
            animate={{ scale: [1, 1.4, 1], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative z-10 flex flex-col flex-1 items-center text-center max-w-4xl mx-auto">
            <Sparkles className="text-rose-500 mb-6 shrink-0" size={48} />
            <h3 className="text-4xl font-bold text-rose-600 mb-8 shrink-0">Our Journey</h3>
            <p className="leading-relaxed text-rose-800 whitespace-pre-line text-lg md:text-xl font-medium">
{`For these 6 years…
there is no pain I didn’t face for you…
no struggle I didn’t go through…
but even for a second… I never thought of leaving you 💔

Even if life ever pushes me away from you…
I know I will still find my way back to you… again and again…
because my heart will never choose anyone else but you 😭

And you… the way you love me… the way you take care of me…
sometimes it makes me feel like I don’t even deserve this kind of love 🥺

You didn’t just love me… you made me your whole world… your life… ❤️

If anything ever happens to me… I know you won’t be able to bear it…
that’s how deeply, truly, and purely you love me 😢

All these years… we never chose hate… even in our worst moments…
we only held on to love… to each other…
and that’s why we’re still here today 🥺

The risks I took for you… and the risks you took for me…
those are not just actions… they are proofs of how much we mean to each other 💔

What we have is not just love…
it’s something rare… something real… something unbreakable…

And no matter how hard life gets… no matter what comes in between us…
I will always choose you… in every life, in every situation… again and again ❤️

I love you… more than my words, more than my tears…
more than anything in this world 💋`}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
      >
        {[
          { value: '∞', label: 'Love', icon: Heart },
          { value: '100+', label: 'Photos', icon: Camera },
          { value: '24/7', label: 'Thinking of You', icon: Star },
          { value: '100%', label: 'Happiness', icon: PartyPopper },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-xl text-center"
          >
            <stat.icon className="mx-auto mb-3 text-pink-500" size={40} fill="currentColor" />
            <p className="text-5xl font-bold text-pink-500 mb-2">{stat.value}</p>
            <p className="text-gray-600 font-semibold text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div> */}
      </div>
    </div>
  );
}
