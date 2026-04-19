import { Outlet, Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Heart, LogOut, Home, Image, Clock, MessageCircle, Gift, Calendar } from 'lucide-react';

interface LayoutProps {
  onLogout: () => void;
}

export function Layout({ onLogout }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/timeline', label: 'Timeline', icon: Clock },
    { path: '/messages', label: 'Messages', icon: MessageCircle },
    { path: '/special', label: 'Special', icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 relative">
      {/* Header with navigation - Single Row */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 backdrop-blur-xl shadow-2xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo and Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/20 p-2 rounded-full backdrop-blur-sm"
              >
                <Heart className="text-white drop-shadow-lg" size={28} fill="white" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
                  Our Love Story
                </h1>
                <p className="text-xs text-white/90 flex items-center gap-1">
                  <Calendar size={12} />
                  Celebrating Forever Together
                </p>
              </div>
            </div>

            {/* Center: Navigation (Desktop) */}
            <nav className="hidden lg:flex gap-2 flex-1 justify-center">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link key={path} to={path}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-pink-500 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm">{label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Navigation */}
            <nav className="flex lg:hidden gap-2 overflow-x-auto flex-1 scrollbar-hide">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link key={path} to={path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-pink-500 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-xs">{label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Logout */}
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-2 bg-white text-pink-500 px-4 md:px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex-shrink-0"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Floating hearts animation - Fixed for full width */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => {
          const startX = (i / 20) * 100;
          return (
            <motion.div
              key={i}
              className="absolute text-pink-500/20"
              style={{
                left: `${startX}%`,
              }}
              initial={{
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              }}
              animate={{
                y: -100,
                x: [0, Math.sin(i) * 40, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 8 + 12,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            >
              <Heart size={Math.random() * 30 + 20} fill="currentColor" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
