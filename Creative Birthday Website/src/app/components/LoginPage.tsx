import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Sparkles, Star, Gift, Music, PartyPopper } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const CREDENTIALS = {
    username: 'jaso',
    password: '1023'
  };

  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Enter your heart's key",
    "A special surprise awaits...",
    "Ready for your birthday magic?",
    "Unlock our memories together"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const errorMessages = [
    "Invalid credentials. Think properly pattanikunju why you are doing this.",
    "Come on thangamailu, I know you can remember the key!",
    "Oops! Wrong password. Think harder,pattu kunju.",
    "Not quite right. Put some thought into it,karuva !",
    "Access denied! Don't let me down,sodabuddy!",
    "Are you really chella kutty ? Try again!"
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      onLogin();
      setError('');
    } else {
      const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setError(randomError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Floating hearts - Fixed for full width */}
        {[...Array(30)].map((_, i) => {
          const startX = (i / 30) * 100;
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-white/15"
              style={{
                left: `${startX}%`,
              }}
              initial={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
              }}
              animate={{
                y: -150,
                x: [0, Math.sin(i) * 60, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 8,
              }}
            >
              <Heart size={Math.random() * 45 + 30} fill="currentColor" />
            </motion.div>
          );
        })}

        {/* Floating Music Notes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`music-${i}`}
            className="absolute text-pink-500/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: 0,
            }}
            animate={{
              y: -150,
              x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 100}px)`,
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            <Music size={Math.random() * 30 + 15} fill="currentColor" />
          </motion.div>
        ))}

        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-pink-500/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            <Star size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}

        {/* Giant glowing background heart behind the card */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.15]"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={700} fill="currentColor" className="text-white" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 flex items-center justify-center opacity-30 blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={600} fill="currentColor" className="text-white" />
        </motion.div>
      </div>

      {/* Decorative background polaroids behind the main card */}
      <motion.div
        initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
        animate={{ x: -260, y: -60, rotate: -15, opacity: 1 }}
        transition={{ delay: 1, duration: 1, type: "spring", bounce: 0.4 }}
        className="absolute w-56 h-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 z-0 border border-white/50 hidden md:block"
      >
        <div className="w-full h-4/5 bg-gradient-to-br from-pink-100 to-rose-200 rounded-md overflow-hidden flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart size={60} className="text-pink-500" fill="currentColor" />
          </motion.div>
        </div>
        <p className="text-center mt-3 text-pink-500 font-bold tracking-wide">Memories...</p>
      </motion.div>
      
      <motion.div
        initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
        animate={{ x: 260, y: 60, rotate: 15, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1, type: "spring", bounce: 0.4 }}
        className="absolute w-56 h-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 z-0 border border-white/50 hidden md:block"
      >
        <div className="w-full h-4/5 bg-gradient-to-br from-pink-100 to-rose-200 rounded-md overflow-hidden flex items-center justify-center">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
            <PartyPopper size={60} className="text-pink-500" />
          </motion.div>
        </div>
        <p className="text-center mt-3 text-pink-500 font-bold tracking-wide">Best Day Ever!</p>
      </motion.div>

      {/* Login card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 border-4 border-white/50 group/card"
      >
        {/* Floating sparkles around card */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-pink-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <Sparkles size={20} fill="currentColor" />
          </motion.div>
        ))}

        {/* Animated lock icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full blur-xl opacity-50 group-hover/card:bg-gradient-to-br group-hover/card:from-pink-500 group-hover/card:to-white transition-colors" />
            <div className="relative flex items-center justify-center bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 p-3 rounded-full shadow-xl overflow-hidden">
              <Heart className="text-white group-hover/card:scale-110 transition-transform duration-300" size={48} fill="currentColor" />
              <div className="absolute inset-0 flex items-center justify-center pt-1 pr-[1px]">
                  <Lock className="text-pink-500 group-hover/card:scale-110 transition-transform duration-300" size={18} fill="currentColor" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Title with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
            Our Love Portal
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="text-pink-500" size={20} fill="currentColor" />
            </motion.div>
            <div className="relative h-6 w-64 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-gray-600 text-sm font-medium absolute"
                >
                  {messages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="text-pink-500" size={20} fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleLogin}
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <motion.div whileTap={{ scale: 0.98 }} className="relative group">
              <div className="absolute inset-0 bg-pink-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-300" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full relative px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all bg-pink-50/50 focus:bg-white font-medium text-sm"
                placeholder="Your love's username"
              />
            </motion.div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <motion.div whileTap={{ scale: 0.98 }} className="relative group">
              <div className="absolute inset-0 bg-pink-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full relative px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all bg-pink-50/50 focus:bg-white font-medium text-sm"
                placeholder="Secret forever code"
              />
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-pink-100 border-2 border-pink-500 text-pink-500 px-5 py-4 rounded-2xl text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 text-white py-4 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <Heart size={20} fill="white" className="relative z-10" />
            <span className="relative z-10">Unlock Our Love Story</span>
            <Sparkles size={20} className="relative z-10" />
          </motion.button>
        </motion.form>

        {/* Hint */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl border-2 border-pink-200"
        >
          <p className="text-center text-sm text-gray-600">
            💡 <span className="font-semibold">Hint:</span> username{' '}
            <span className="font-bold text-pink-500">"mylove"</span> & password{' '}
            <span className="font-bold text-pink-500">"forever"</span>
          </p>
        </motion.div> */}
      </motion.div>
    </div>
  );
}
