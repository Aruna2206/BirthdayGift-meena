import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, Star, Crown, Zap, Camera, Music } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { fetchFavorites, Photo } from '../../services/api';
import { API_BASE_URL } from '../../services/config';

export function SpecialPage() {
  const [favorites, setFavorites] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites()
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load favorites", err);
        setLoading(false);
      });
  }, []);

  const reasons = [
    { text: 'Your beautiful smile that lights up my world', emoji: '😊' },
    { text: 'The way you laugh at my silly jokes', emoji: '😂' },
    { text: 'Your kindness and compassionate heart', emoji: '💖' },
    { text: 'How you make every ordinary day extraordinary', emoji: '✨' },
    { text: 'Your unwavering support and love', emoji: '🤗' },
    { text: 'The adventures we share together', emoji: '🌍' },
    { text: 'Your strength and determination', emoji: '💪' },
    { text: 'The way you understand me like no one else', emoji: '🥰' },
    { text: 'Your amazing sense of humor', emoji: '🎭' },
    { text: 'How you make me want to be a better person', emoji: '🌟' },
    { text: 'Your gentle and caring nature', emoji: '🌸' },
    { text: 'The memories we create every single day', emoji: '📸' },
  ];

  const wishes = [
    { icon: Star, text: 'May all your dreams come true', color: 'from-pink-500 to-rose-500' },
    { icon: Heart, text: 'Endless love and happiness', color: 'from-pink-500 to-rose-500' },
    { icon: Sparkles, text: 'A year full of magical moments', color: 'from-pink-500 to-rose-500' },
    { icon: Crown, text: 'Being treated like the royalty you are', color: 'from-pink-500 to-rose-500' },
    { icon: Zap, text: 'Exciting adventures and new experiences', color: 'from-pink-500 to-rose-500' },
    { icon: Gift, text: 'Surprises that make you smile', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Gift className="text-pink-500" size={64} />
        </motion.div>
        <h2 className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
          You Are Special
        </h2>
        <p className="text-2xl text-gray-600">
          Here's why you mean everything to me 💝
        </p>
      </motion.div>

      {/* Special Photo Collage - Favorites */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-4xl font-bold text-center mb-10 text-pink-500 flex items-center justify-center gap-3">
          <Camera size={40} />
          Our Favorite Moments Collection
        </h3>
        {loading ? (
          <div className="text-center py-10 animate-pulse text-pink-500">Loading your favorites...</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 text-white-500">
            <Heart size={48} className="mx-auto mb-4 opacity-30" />
            {/* <p className="text-xl">No favorites yet! Go highlight some memories 💕</p> */}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {favorites.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 3 : -3, zIndex: 10 }}
                className="relative group cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-white transform rotate-1 group-hover:rotate-0 transition-transform">
                  <ImageWithFallback
                    src={`${API_BASE_URL}${photo.url}`}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-bold text-lg">{photo.title}</p>
                    {photo.category && (
                      <span className="text-white/90 text-xs font-semibold">{photo.category}</span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Heart className="text-pink-500 shadow-sm" fill="currentColor" size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Reasons I Love You */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-20"
      >
        <h3 className="text-4xl font-bold text-center mb-10 text-pink-500">
          ∞ Reasons I Love You
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
              className="bg-gradient-to-br bg-white p-6 rounded-2xl shadow-lg border-2 border-pink-200 relative overflow-hidden group"
            >
              <motion.div
                className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {reason.emoji}
              </motion.div>
              <div className="flex items-start gap-3 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, delay: index * 0.1, repeat: Infinity }}
                >
                  <Heart className="text-pink-500 flex-shrink-0" size={24} fill="currentColor" />
                </motion.div>
                <p className="text-gray-700 font-medium text-lg">{reason.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Birthday Wishes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-4xl font-bold text-center mb-10 text-pink-500">
          My Wishes For You 🎂
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {wishes.map((wish, index) => {
            const Icon = wish.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.08, y: -5 }}
                className={`bg-gradient-to-br bg-white p-8 rounded-3xl shadow-xl text-rose-500 relative overflow-hidden`}
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="mb-4 relative z-10"
                >
                  <Icon size={48} />
                </motion.div>
                <p className="text-xl font-bold relative z-10">{wish.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Music Player Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="mb-16 max-w-3xl mx-auto"
      >
        <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-10 rounded-3xl shadow-2xl text-white">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-4"
          >
            <Music size={60} />
          </motion.div>
          <h3 className="text-3xl font-bold text-center mb-4">Our Song Playing in My Heart 🎵</h3>
          <p className="text-center text-lg opacity-90">
            Every beat reminds me of you, every melody tells our story
          </p>
        </div>
      </motion.div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 p-12 rounded-3xl shadow-2xl text-white text-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6 relative z-10"
          >
            <Heart size={64} fill="white" />
          </motion.div>
          <h3 className="text-5xl font-bold mb-6 relative z-10">You Are My Everything</h3>
          <p className="text-2xl leading-relaxed relative z-10">
            Today and every day, I want you to know how incredibly special you are to me.
            You've made my life more beautiful, more meaningful, and more full of love than
            I ever thought possible. Happy Birthday to the love of my life! Here's to
            celebrating you today and forever. I love you more than words can say! 💕✨
          </p>
        </div>
      </motion.div>
    </div>
  );
}
